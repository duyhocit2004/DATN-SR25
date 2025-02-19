import React from 'react';
import { Table, Button, Space, Image, Card, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập cho sản phẩm
const products = [
    {
        key: '1',
        id: 1,
        name: 'Áo thun nam',
        image: 'https://via.placeholder.com/100',
        quantity: 50,
        price: 200000,
    },
    {
        key: '2',
        id: 2,
        name: 'Quần jeans nữ',
        image: 'https://via.placeholder.com/100',
        quantity: 30,
        price: 350000,
    },
    {
        key: '3',
        id: 3,
        name: 'Đồng hồ thời trang',
        image: 'https://via.placeholder.com/100',
        quantity: 10,
        price: 1500000,
    },
];

const ProductList: React.FC = () => {
    const navigate = useNavigate();

    // Hàm xử lý khi nhấn nút "Thêm sản phẩm"
    const handleAddProduct = () => {
        navigate('/admin/products/add');
    };

    // Hàm xử lý khi nhấn nút "Sửa sản phẩm"
    const handleEditProduct = (id: number) => {
        navigate(`/admin/products/edit/${id}`);
    };

    // Hàm xử lý khi nhấn nút "Xóa sản phẩm"
    const handleDeleteProduct = (id: number) => {
        message.success('Xóa sản phẩm thành công!');
        console.log('Xóa sản phẩm có ID:', id);
    };

    // Cấu hình các cột trong bảng
    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'key',
            key: 'key',
            render: (text: string, record: any, index: number) => index + 1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <Image width={80} src={image} alt="Ảnh sản phẩm" />,
        },
        {
            title: 'Số lượng trong kho',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá sản phẩm (VNĐ)',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => price.toLocaleString('vi-VN') + ' ₫',
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditProduct(record.id)}>
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
                        onConfirm={() => handleDeleteProduct(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card 
            title="Quản lý sản phẩm" 
            bordered={false} 
            extra={
                <Button type="primary" onClick={handleAddProduct}>
                    Thêm sản phẩm
                </Button>
            }
        >
            <Table 
                columns={columns} 
                dataSource={products} 
                pagination={false} 
                rowKey="id" 
            />
        </Card>
    );
};

export default ProductList;
