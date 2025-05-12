import { Button, Table, Tooltip } from "antd";
import { IColor } from "@/types/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { TablePaginationConfig } from "antd/es/table";

interface ColorTableProps {
  colors: IColor[];
  loading: boolean;
  onEdit: (color: IColor) => void;
  onDelete: (id: number) => void;
  pagination?: TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig) => void;
}

const ColorTable: React.FC<ColorTableProps> = ({ colors, loading, onEdit, onDelete, pagination, onChange }) => {
  const columns: ColumnsType<IColor> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
      minWidth: 70,
    },
    {
      title: "Tên màu",
      dataIndex: "name",
      key: "name",
      minWidth: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      minWidth: 150,
      render: (date: string) => {
        return date ? new Date(date).toLocaleDateString("vi-VN") : "";
      },
    },
    {
      title: "Hành động",
      key: "action",
      minWidth: 100,
      fixed: "right",
      render: (_: any, record: IColor) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={e => {
                e.stopPropagation();
                onDelete(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table<IColor>
      columns={columns}
      rowKey={record => record.id}
      dataSource={colors}
      loading={loading}
      onRow={record => ({
        onClick: () => onEdit(record),
        style: { cursor: "pointer" },
      })}
      tableLayout="auto"
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default ColorTable;
