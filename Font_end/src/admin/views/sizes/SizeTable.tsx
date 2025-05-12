import React from "react";
import { Button, Table, Tooltip, Space, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ISize } from "@/types/interface";
import dayjs from "dayjs";

interface SizeTableProps {
  sizes: ISize[];
  loading: boolean;
  onEdit: (size: ISize) => void;
  onDelete: (id: number) => void;
}

// Thứ tự chuẩn cho size chữ
const SIZE_ORDER = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'
];

const SizeTable: React.FC<SizeTableProps> = ({
  sizes,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 400,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    // {
    //   title: "Loại",
    //   dataIndex: "type",
    //   key: "type",
    //   render: (type: string) => (type === "numeric" ? "Size số" : "Size chữ"),
    // },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      minWidth: 150,
      render: (date: string) => {
        return dayjs(date).format("DD/MM/YYYY ");
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      render: (_: any, record: ISize) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa size này?"
              onConfirm={() => onDelete(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Sắp xếp sizes trước khi hiển thị
  const sortedSizes = [...sizes].sort((a, b) => {
    // Nếu cả hai đều là size số
    if (a.type === 'numeric' && b.type === 'numeric') {
      return Number(a.size) - Number(b.size);
    }
    // Nếu cả hai đều là size chữ
    if (a.type === 'text' && b.type === 'text') {
      const idxA = SIZE_ORDER.indexOf(a.size.toUpperCase());
      const idxB = SIZE_ORDER.indexOf(b.size.toUpperCase());
      // Nếu đều có trong bảng thứ tự
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      // Nếu chỉ 1 cái có trong bảng thứ tự thì ưu tiên cái có
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      // Nếu không có trong bảng thứ tự thì so sánh alphabet
      return a.size.localeCompare(b.size, 'vi');
    }
    // Nếu một cái là số và một cái là chữ, ưu tiên hiển thị size số trước
    return a.type === 'numeric' ? -1 : 1;
  });

  return (
    <Table
      columns={columns}
      dataSource={sortedSizes}
      rowKey="id"
      loading={loading}
      onRow={(record) => ({
        onClick: () => onEdit(record),
        style: { cursor: 'pointer' }
      })}
    />
  );
};

export default SizeTable;
