import React from 'react';
import { Card, Table, Tag } from 'antd';
import { IOrder } from '@/types/interface';
import { OrderStatusDataClient } from '@/utils/constantData';
import { getColorOrderStatus, getLabelByValue } from '@/utils/functions';
import dayjs from 'dayjs';

interface OrderHistoryFormProps {
  order: IOrder;
}

const OrderHistoryForm: React.FC<OrderHistoryFormProps> = ({ order }) => {
  const statusHistoryColumns = [
    {
      title: 'Thời gian',
      dataIndex: 'change_at',
      key: 'change_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Trạng thái cũ',
      dataIndex: 'old_status',
      key: 'old_status',
      render: (status: string) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataClient, status)}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái mới',
      dataIndex: 'new_status',
      key: 'new_status',
      render: (status: string) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataClient, status)}
        </Tag>
      ),
    },
    {
      title: 'Người thay đổi',
      dataIndex: 'name_change',
      key: 'name_change',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role_change',
      key: 'role_change',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
  ];

  return (
    <Card
      title="Lịch sử đơn hàng"
      className="mt-4"
    >
      <Table
        columns={statusHistoryColumns}
        dataSource={order.statusHistories}
        rowKey="id"
        pagination={false}
        scroll={{ x: '100%' }}
      />
    </Card>
  );
};

export default OrderHistoryForm; 