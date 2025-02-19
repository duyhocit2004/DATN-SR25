import React from 'react';
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Upload,
    Card,
    message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

// Hàm xử lý upload ảnh
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Giá trị form:', values);
        message.success('Thêm sản phẩm thành công!');
        navigate('/admin/products');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Lỗi:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin!');
    };

    return (
        <Card title="Thêm sản phẩm mới" bordered={false} style={{ maxWidth: 800, margin: '0 auto' }}>
            <Form
                form={form}
                name="productAdd"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* Tên sản phẩm */}
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                {/* Danh mục */}
                <Form.Item
                    label="Danh mục"
                    name="category"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                >
                    <Select placeholder="Chọn danh mục">
                        <Option value="electronics">Điện tử</Option>
                        <Option value="fashion">Thời trang</Option>
                        <Option value="home">Đồ gia dụng</Option>
                    </Select>
                </Form.Item>

                {/* Số lượng */}
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} placeholder="Nhập số lượng" />
                </Form.Item>

                {/* Giá sản phẩm */}
                <Form.Item
                    label="Giá sản phẩm (VNĐ)"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá sản phẩm" />
                </Form.Item>

                {/* Giảm giá sản phẩm (Không bắt buộc) */}
                <Form.Item
                    label="Giảm giá sản phẩm (%)"
                    name="discount"
                >
                    <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Nhập % giảm giá (Nếu có)" />
                </Form.Item>

                {/* Miêu tả */}
                <Form.Item
                    label="Miêu tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập miêu tả!' }]}
                >
                    <TextArea rows={4} placeholder="Nhập miêu tả sản phẩm" />
                </Form.Item>

                {/* Màu */}
                <Form.Item
                    label="Màu"
                    name="color"
                >
                    <Input placeholder="Nhập màu sản phẩm" />
                </Form.Item>

                {/* Kích cỡ */}
                <Form.Item
                    label="Kích cỡ"
                    name="size"
                >
                    <Input placeholder="Nhập kích cỡ sản phẩm" />
                </Form.Item>

                {/* Nội dung */}
                <Form.Item
                    label="Nội dung"
                    name="content"
                >
                    <TextArea rows={4} placeholder="Nhập nội dung sản phẩm" />
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
                        <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                    </Upload>
                </Form.Item>

                {/* Album ảnh */}
                <Form.Item
                    label="Album ảnh"
                    name="album"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="album"
                        listType="picture-card"
                        multiple
                        beforeUpload={() => false} // Không tự động upload
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => navigate('/admin/products')}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductAdd;
