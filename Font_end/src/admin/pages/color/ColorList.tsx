import React from 'react';
import { Table, Button, Space, Spin, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';


const { Text } = Typography;

type Color = {
  id: number;
  name: string;
};

type Props = {
  colors: Color[];
  loading: boolean;
  error: string | null;
  deleteColor: (id: number | string) => void;
};

const ListColor: React.FC<Props> = ({ colors, loading, error, deleteColor }) => {
  const safeColors = Array.isArray(colors) ? colors : [];

  const columns:ColumnsType<Color> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: Color, index: number) => index + 1,
      align: 'center',
    },
    {
      title: 'Tên Màu',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Thao Tác',
      key: 'action',
      align: 'center',
      render: (_: any, record: Color) => (
        <Space>
          <NavLink to={`/admin/colors/edit/${record.id}`}>
            <Button type="primary">
              Cập nhật
            </Button>
          </NavLink>
          <Button type="primary" danger onClick={() => deleteColor(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải..." style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }} />;
  }

  if (error) {
    return <Text type="danger" style={{ display: 'block', textAlign: 'center', marginTop: 20 }}>{`Lỗi: ${error}`}</Text>;
  }

  return (
    <Table
      dataSource={safeColors}
      columns={columns}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'Không có dữ liệu' }}
    />
  );
};

export default ListColor;
