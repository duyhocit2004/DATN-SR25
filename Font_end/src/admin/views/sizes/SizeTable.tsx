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

  return (
    <Table
      columns={columns}
      dataSource={sizes}
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
