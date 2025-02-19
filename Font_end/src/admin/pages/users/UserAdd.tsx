import React from 'react';
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

const { Option } = Select;

// Hàm xử lý upload ảnh (bạn có thể thay đổi thành upload lên server)
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const UserAdd: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Giá trị form:', values);
        message.success('Thêm tài khoản thành công!');
        navigate('/admin/accounts');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Lỗi:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin!');
    };

    return (
        <Card title="Thêm tài khoản mới" bordered={false} style={{ maxWidth: 600, margin: '0 auto' }}>
            <Form
                name="userAdd"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* Họ và tên */}
                <Form.Item
                    label="Họ và tên"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                {/* Số điện thoại */}
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                        {
                            pattern: /^[0-9]{10,11}$/,
                            message: 'Số điện thoại không hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                {/* Vai trò */}
                <Form.Item
                    label="Vai trò"
                    name="role"
                    rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                >
                    <Select placeholder="Chọn vai trò">
                        <Option value="admin">Admin</Option>
                        <Option value="moderator">Moderator</Option>
                        <Option value="customer">Khách hàng</Option>
                    </Select>
                </Form.Item>

                {/* Ảnh đại diện */}
                <Form.Item
                    label="Ảnh đại diện"
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                >
                    <Upload
                        name="avatar"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false} // Không tự động upload
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                {/* Mật khẩu */}
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải ít nhất 6 ký tự!' },
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm tài khoản
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate('/admin/accounts')}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UserAdd;
