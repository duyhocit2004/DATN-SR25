import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { IProducts } from '../../../interface/Products';
import { GetProductById, UpdateProduct } from '../../../service/products/productService';


const ProductUpdate: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
        const [categories, setCategories] = useState([]);
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await GetProductById(id);
                console.log("API Response:", response);
    
                const data = response.data || response; // Kiểm tra có cần .data không
                console.log("Processed Data:", data);

                    // Lấy danh mục
                    const categoryRes = await fetch("http://127.0.0.1:8000/api/categories");
                    const categoryData = await categoryRes.json();
                    setCategories(categoryData);
    
                if (!data) {
                    message.error("Không tìm thấy sản phẩm!");
                    return;
                }
    
                form.setFieldsValue({
                    name: data.name_product || '',
                    category: data.categories_id ? data.categories_id.toString() : '',  
                    quantity: data.base_stock || 0,
                    price: data.price_regular || 0,
                    discount: data.price_sale ? ((1 - data.price_sale / data.price_regular) * 100).toFixed(2) : 0,
                    description: data.description || '',
                    avatar: data.image ? [{ url: data.image }] : [],
                });
    
                console.log("Đã setFieldsValue thành công!");
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
                message.error('Không thể tải dữ liệu sản phẩm!');
            }
        };
    
        if (id) fetchProduct();
    }, [id, form]);
    

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const updatedProduct: IProducts = {
                id: Number(id),
                name_product: values.name,
                categories_id: parseInt(values.category),
                base_stock: values.quantity,
                price_regular: values.price,
                price_sale: values.discount ? values.price - (values.price * values.discount) / 100 : values.price,
                description: values.description,
                image: values.avatar?.[0]?.url || null,
                SKU: '',
                views: 0,
                content: '',
                data: undefined
            };

            await UpdateProduct(id, updatedProduct);
            message.success('Cập nhật sản phẩm thành công!');
            navigate('/admin/products');
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            message.error('Không thể cập nhật sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Chỉnh sửa sản phẩm" bordered={false}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
                    <Select placeholder="Chọn danh mục" options={categories} />
                </Form.Item>

                <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Giá sản phẩm (VNĐ)" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}>
                    <InputNumber min={1000} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Giảm giá sản phẩm (%)" name="discount">
                    <InputNumber min={0} max={100} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập miêu tả' }]}>
                    <Input.TextArea rows={4} placeholder="Nhập miêu tả sản phẩm" />
                </Form.Item>

                <Form.Item label="Ảnh đại diện" name="avatar" valuePropName="fileList" getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}>
                    <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Cập nhật</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/products')}>Hủy</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductUpdate;
