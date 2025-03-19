import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ListVouchers, ToggleVoucherStatus } from '../../../service/voucher/voucherService';
import { IVoucher } from '../../../interface/Voucher';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ListVoucher: React.FC = () => {
    const [data, setData] = useState<IVoucher[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const vouchers = await ListVouchers();
            console.log("Dữ liệu voucher từ API:", vouchers);
            setData(vouchers);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
        }
        setLoading(false);
    };

    const getStatus = (voucher: IVoucher) => {
        switch (voucher.status) {
            case 'active':
                return { text: 'Hoạt động', color: 'green' };
            case 'expired':
                return { text: 'Hết hạn', color: 'gray' };
            case 'used_up':
                return { text: 'Đã sử dụng hết', color: 'red' };
            case 'disabled':
                return { text: 'Vô hiệu hóa', color: 'volcano' };
            default:
                return { text: 'Không xác định', color: 'blue' };
        }
    };

    const handleToggleStatus = async (id: number) => {
        try {
            const response = await ToggleVoucherStatus(id);
            console.log("Response từ API sau khi cập nhật:", response);
            if (response) {
                message.success(response.status === 'active' ? 'Voucher đã được kích hoạt' : 'Voucher đã bị vô hiệu hóa');
                fetchData();
            } else {
                message.error('Không thể cập nhật trạng thái voucher');
            }
        } catch (error) {
            console.error("Lỗi API:", error);
            message.error('Lỗi khi cập nhật trạng thái voucher');
        }
    };

    const columns: ColumnsType<IVoucher> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        // { title: 'Tên', dataIndex: 'name', key: 'name' },
        { title: 'Mã giảm giá', dataIndex: 'code', key: 'code' },
        { title: 'Giá trị giảm', dataIndex: 'discount_value', key: 'discount_value' },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : 'N/A'
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => {
                const status = getStatus(record);
                return <Tag color={status.color}>{status.text}</Tag>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type={record.status === 'active' ? 'danger' : 'primary'} onClick={() => handleToggleStatus(record.id)}>
                        {record.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    </Button>
                    <Button type="default" onClick={() => navigate(`/admin/vouchers/edit/${record.id}`)}>Sửa</Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <h1>Danh sách Voucher</h1>
            <Button type="primary" onClick={() => navigate('/admin/vouchers/addvouchers')} style={{ marginBottom: 16 }}>
                Thêm mới
            </Button>
            <Table columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 5 }} rowKey="id" />
        </>
    );
};

export default ListVoucher;
