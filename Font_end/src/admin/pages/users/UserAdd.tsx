import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Upload,
    Card,
    message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const normFile = (e) => {
    return e && e.fileList ? e.fileList : [];
};

const AddUser = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (!values.user_image?.[0]?.originFileObj) {
                message.error("Vui lòng chọn ảnh đại diện!");
                return;
            }

            const formDataUser = new FormData();
            formDataUser.append("name", values.name);
            formDataUser.append("email", values.email);
            formDataUser.append("phone_number", values.phone_number);
            formDataUser.append("password", values.password);
            formDataUser.append("user_iamge", values.user_image[0].originFileObj);

            const userResponse = await fetch("http://127.0.0.1:8000/api/users", {
                method: "POST",
                body: formDataUser,
            });

            if (userResponse.ok) {
                message.success("Thêm tài khoản thành công!");
                navigate("/admin/users");
            } else {
                message.error(`Lỗi ${userResponse.status}: Không thể thêm tài khoản!`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            message.error("Không thể thêm tài khoản!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm tài khoản mới" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }} loading={loading}>
            <Form
                form={form}
                name="AddUser"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
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
                    <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone_number"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện"
                    name="user_image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
                >
                    <Upload
                        name="user_image"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' }
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm tài khoản</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/accounts')}>Hủy</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddUser;
