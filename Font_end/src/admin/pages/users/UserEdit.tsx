import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAdd, UserById, UserUpdate } from '../../../service/auth/user';
import api from '../../../axios/config';

const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
};

const UserEdit: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [userImage, setUserImage] = useState<string | null>(null);
    useEffect(() => {
        const fetchUserData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const users = await UserById(id);
                console.log("Dữ liệu user từ API:", users); // Kiểm tra API trả về
    
                if (!users || !Array.isArray(users)) {
                    message.error("Dữ liệu từ API không hợp lệ!");
                    return;
                }
    
                const user = users.find((u: any) => u.id.toString() === id);
                console.log("User sau khi lọc:", user);
    
                if (user) {
                    setUserImage(user.user_image || null);
                    form.resetFields();
                    form.setFieldsValue({
                        name: user.name,
                        email: user.email,
                        phone_number: user.phone_number,
                        avatar: user.user_image ? [{ uid: '-1', name: 'avatar.png', url: user.user_image }] : [],
                    });
                } else {
                    message.error("Không tìm thấy người dùng!");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                message.error("Không thể tải dữ liệu người dùng!");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [id, form]);
    

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const { avatar, ...userData } = values;
            let avatarUrl = userImage;

            if (avatar && avatar.length > 0 && avatar[0].originFileObj) {
                const formData = new FormData();
                formData.append('file', avatar[0].originFileObj);
                const uploadResponse = await api.post('/upload', formData);
                avatarUrl = uploadResponse.data.url;
            }

            if (id) {
                await UserUpdate(id, { ...userData, user_image: avatarUrl });
                message.success('Cập nhật tài khoản thành công!');
            } else {
                await UserAdd({ ...userData, user_image: avatarUrl });
                message.success('Thêm tài khoản thành công!');
            }

            navigate('/admin/accounts');
        } catch (error) {
            message.error('Có lỗi xảy ra khi lưu dữ liệu!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title={id ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"} bordered={false} style={{ maxWidth: 600, margin: '0 auto' }} loading={loading}>
            <Form form={form} name="userEdit" layout="vertical" onFinish={onFinish}>
                <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input placeholder="Nhập email" autoComplete="email" />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phone_number" rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}>
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item label="Ảnh đại diện" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        name="avatar"
                        listType="picture"
                        maxCount={1}
                        defaultFileList={userImage ? [{ uid: '-1', name: 'avatar.png', url: userImage }] : []}
                        beforeUpload={(file) => {
                            const isImage = file.type.startsWith('image/');
                            if (!isImage) {
                                message.error('Bạn chỉ có thể tải lên file ảnh!');
                            }
                            return isImage ? false : Upload.LIST_IGNORE;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Mật khẩu (Để trống nếu không đổi)" name="password" rules={[{ min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' }]}>
                    <Input.Password placeholder="Nhập mật khẩu mới (nếu muốn đổi)" autoComplete="new-password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {id ? "Cập nhật tài khoản" : "Thêm tài khoản"}
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/accounts')}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UserEdit;
