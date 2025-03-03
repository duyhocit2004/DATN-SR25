import React from "react";
import { NavLink } from "react-router-dom";
import { Table, Button, Space, Spin, Alert, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

type Category = {
  id: number;
  name: string;
  type: string;
};

type Props = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  deleteCategory: (id: number | string) => void;
};

const ListCategory: React.FC<Props> = ({ categories, loading, error, deleteCategory }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  // Định nghĩa các cột cho bảng
  const columns: ColumnsType<Category> = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index) => index + 1, // Hiển thị số thứ tự
      align: 'center',
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Loại Danh Mục',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Thao Tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/admin/categories/edit/${record.id}`}>
            <Button type="primary" >
              Cập nhật
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            onClick={() => deleteCategory(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
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
      dataSource={safeCategories}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'Không có dữ liệu' }}
      
    />
  );
};

export default ListCategory;