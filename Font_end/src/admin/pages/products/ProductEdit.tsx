// import React from 'react'

// const ProductEdit = () => {
//   return (
//     <div>ProductEdit</div>
//   )
// }

// export default ProductEdit;

import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

// Danh sách danh mục giả lập
const categories = [
    { value: '1', label: 'Áo' },
    { value: '2', label: 'Quần' },
    { value: '3', label: 'Phụ kiện' },
];

const ProductEdit: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Giả lập dữ liệu sản phẩm từ id
    useEffect(() => {
        // Giả lập gọi API lấy dữ liệu sản phẩm theo ID
        const fetchProduct = () => {
            // Dữ liệu giả lập
            const productData = {
                name: 'Áo thun nam',
                category: '1',
                quantity: 50,
                price: 200000,
                discount: 10,
                description: 'Áo thun nam chất liệu cotton',
                color: 'Đen',
                size: 'L',
                avatar: 'https://via.placeholder.com/100',
                album: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
            };
            form.setFieldsValue(productData);
        };

        fetchProduct();
    }, [id, form]);

    // Hàm xử lý khi nhấn nút "Cập nhật"
    const onFinish = (values: any) => {
        setLoading(true);
        console.log('Dữ liệu cập nhật:', values);
        setTimeout(() => {
            setLoading(false);
            message.success('Cập nhật sản phẩm thành công!');
            navigate('/admin/products');
        }, 1000);
    };

    return (
        <Card title="Chỉnh sửa sản phẩm" bordered={false}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Danh mục"
                    name="category"
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        options={categories}
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm (VNĐ)"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                >
                    <InputNumber min={1000} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Giảm giá sản phẩm (%)"
                    name="discount"
                >
                    <InputNumber min={0} max={100} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Miêu tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập miêu tả' }]}
                >
                    <Input.TextArea rows={4} placeholder="Nhập miêu tả sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Màu"
                    name="color"
                    rules={[{ required: true, message: 'Vui lòng nhập màu sản phẩm' }]}
                >
                    <Input placeholder="Nhập màu sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Kích cỡ"
                    name="size"
                    rules={[{ required: true, message: 'Vui lòng nhập kích cỡ sản phẩm' }]}
                >
                    <Input placeholder="Nhập kích cỡ sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện"
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Album ảnh"
                    name="album"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                >
                    <Upload
                        listType="picture-card"
                        multiple
                        beforeUpload={() => false}
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/products')}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductEdit;
