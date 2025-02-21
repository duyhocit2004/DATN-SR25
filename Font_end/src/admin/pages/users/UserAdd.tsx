import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    Card,
    message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios/config';
import { UserAdd } from '../../../service/auth/user';


const { Option } = Select;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddUser: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const { avatar, ...userData } = values;
            let avatarUrl = '';

            if (avatar && avatar.length > 0 && avatar[0].originFileObj) {
                const formData = new FormData();
                formData.append('file', avatar[0].originFileObj);
                const uploadResponse = await api.post('/upload', formData);
                avatarUrl = uploadResponse.data.url;
            }

            await UserAdd({ ...userData, user_image: avatarUrl });
            message.success('Thêm tài khoản thành công!');
            navigate('/admin/accounts');
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm tài khoản!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm tài khoản mới" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }} loading={loading}>
            <Form form={form} name="AddUser" layout="vertical" onFinish={onFinish}>
                <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}> <Input placeholder="Nhập họ và tên" /> </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}> <Input placeholder="Nhập email" /> </Form.Item>
                <Form.Item label="Số điện thoại" name="phone_number" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }]}> <Input placeholder="Nhập số điện thoại" /> </Form.Item>
                <Form.Item label="Vai trò" name="role" rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}> <Select placeholder="Chọn vai trò"> <Option value="admin">Admin</Option> <Option value="moderator">Moderator</Option> <Option value="customer">Khách hàng</Option> </Select> </Form.Item>
                <Form.Item label="Ảnh đại diện" name="avatar" valuePropName="fileList" getValueFromEvent={normFile}> <Upload name="avatar" listType="picture" maxCount={1} beforeUpload={(file) => { const isImage = file.type.startsWith('image/'); if (!isImage) { message.error('Bạn chỉ có thể tải lên file ảnh!'); } return isImage ? false : Upload.LIST_IGNORE; }}> <Button icon={<UploadOutlined />}>Chọn ảnh</Button> </Upload> </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }, { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' }]}> <Input.Password placeholder="Nhập mật khẩu" /> </Form.Item>
                <Form.Item> <Button type="primary" htmlType="submit">Thêm tài khoản</Button> <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/accounts')}>Hủy</Button> </Form.Item>
            </Form>
        </Card>
    );
};

export default AddUser;
