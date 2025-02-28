import React from 'react';
import { Table, Button, Space, Spin, Alert, Card, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

type Size = {
  id: number;
  name: string;
};

type Props = {
  sizes: Size[];
  loading: boolean;
  error: string | null;
  deleteSize: (id: number | string) => void;
};

const ListSize: React.FC<Props> = ({ sizes, loading, error, deleteSize }) => {
  const safeSizes = Array.isArray(sizes) ? sizes : [];

  // Định nghĩa các cột cho bảng
  const columns: ColumnsType<Size> = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index) => index + 1, // Hiển thị số thứ tự
      align: 'center',
    },
    {
      title: 'Tên Size',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/admin/sizes/edit/${record.id}`}>
            <Button type="primary" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
              Chỉnh sửa
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            onClick={() => deleteSize(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ margin: '20px 0' }}>
        <Alert message={`Lỗi: ${error}`} type="error" showIcon />
      </div>
    );
  }

  return (
    
      <Table
        dataSource={safeSizes}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: 'Không có dữ liệu' }}
       
      />
  );
};

export default ListSize;
