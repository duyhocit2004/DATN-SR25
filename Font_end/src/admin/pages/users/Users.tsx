import React from 'react';
import { Table, Button, Space, Image, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập (thay bằng dữ liệu thật từ API)
const data = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        role: 'Admin',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: 2,
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0987654321',
        role: 'User',
        image: 'https://via.placeholder.com/80',
    },
    {
        id: 3,
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        phone: '0912345678',
        role: 'Moderator',
        image: 'https://via.placeholder.com/80',
    },
];

const AccountList: React.FC = () => {
    const navigate = useNavigate();

    // Hàm xử lý chỉnh sửa tài khoản
    const handleEdit = (id: number) => {
        navigate(`/admin/users/edit/${id}`);
    };

    // Hàm xử lý xóa tài khoản
    const handleDelete = (id: number) => {
        console.log('Xóa tài khoản:', id);
        // Thực hiện xóa tài khoản (Gọi API nếu cần)
    };

    // Cấu hình cột cho bảng
    const columns: ColumnsType<typeof data[0]> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let color = 'blue';
                if (role === 'Admin') color = 'red';
                else if (role === 'Moderator') color = 'orange';
                return <Tag color={color}>{role}</Tag>;
            },
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => (
                <Image src={image} alt="Ảnh" width={50} height={50} style={{ borderRadius: '50%' }} />
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.id)}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <h1>Danh sách người dùng</h1>
            <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button
                    type="primary"
                    onClick={() => navigate('/admin/users/add')}
                >
                    Thêm tài khoản
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                rowKey="id"
            />
        </>
    );
};

export default AccountList;
