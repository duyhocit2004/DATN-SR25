import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Image, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ListUsers, ToggleUserStatus } from '../../../service/auth/user';
import { IUser } from '../../../interface/User';

const ListUser: React.FC = () => {
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

    const handleToggleStatus = async (id: number) => {
        try {
            const response = await ToggleUserStatus(id);
            message.success(response.is_active ? 'Tài khoản đã bị khóa' : 'Tài khoản đã được mở khóa');
            fetchData();
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái tài khoản');
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
            title: 'Trạng thái',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'green' : 'volcano'}>
                    {isActive ? 'Hoạt động' : 'Bị khóa'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type={record.is_active ? 'danger' : 'primary'} onClick={() => handleToggleStatus(record.id, record.is_active)}>
                        {record.is_active ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <h1>Danh sách người dùng</h1>
            <Table columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
};

export default ListUser;