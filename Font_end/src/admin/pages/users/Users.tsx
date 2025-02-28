import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Image, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { ListUsers, UserDelete } from '../../../service/auth/user';
import { IUser } from '../../../interface/User';


const ListUser: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const users = await ListUsers();
            setData(users);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
        }
        setLoading(false);
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/users/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            await UserDelete(id);
            message.success('Xóa tài khoản thành công');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi xóa tài khoản');
        }
    };

    const columns: ColumnsType<IUser> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Họ và tên', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone_number', key: 'phone_number' },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
                let color = role === 'Admin' ? 'red' : role === 'Moderator' ? 'orange' : 'blue';
                return <Tag color={color}>{role}</Tag>;
            },
        },
        {
            title: 'Ảnh',
            dataIndex: 'user_image',
            key: 'user_image',
            render: (image: string | null) => (
                image ? <Image src={image} alt="Ảnh" width={50} height={50} style={{ borderRadius: '50%' }} /> : 'N/A'
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
                        Chỉnh sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
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
                <Button type="primary" onClick={() => navigate('/admin/users/add')}>
                    Thêm tài khoản
                </Button>
            </div>
            <Table columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
};

export default ListUser;
