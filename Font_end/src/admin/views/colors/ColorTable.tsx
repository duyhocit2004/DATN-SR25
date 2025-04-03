import { Button, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteColor,
  fetchColors,
  setPagination,
  setSelectedColor,
} from "@/store/reducers/adminColorSlice";
import dayjs, { Dayjs } from "dayjs";
import { IColor } from "@/types/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const ColorTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminColor
  );

  const columns: ColumnsType<IColor> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value: any, record: any, index: number) => {
        return (
          <span>
            {(pagination?.page - 1) * pagination?.pageSize + index + 1}
          </span>
        );
      },
      minWidth: 70,
    },
    {
      title: "Mã màu",
      dataIndex: "code",
      key: "code",
      minWidth: 150,
    },
    {
      title: "Màu",
      dataIndex: "code",
      key: "color",
      minWidth: 150,
      render: (color: string) => {
        return (
          <div
            className={`color w-6 h-6 shrink-0 rounded-[50%]`}
            style={{
              backgroundColor: color,
              border: color.toLowerCase() === "#ffffff" || color.toLowerCase() === "white" ? "1px solid #ccc" : "none"
            }}
          ></div>
        );
      },
    },
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   minWidth: 200,
    //   render: (createdAt: Dayjs) => {
    //     return (
    //       <div>{createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>
    //     );
    //   },
    // },
    {
      title: "Hành động",
      key: "action",
      minWidth: 150,
      fixed: 'right',
      render: (_, record) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteColor(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDeleteColor = async (colorId: number) => {
    dispatch(deleteColor(colorId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchColors());
  };

  const onRowClick = (record: IColor) => {
    dispatch(setSelectedColor(record));
  };

  return (
    <Table<IColor>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={colors}
      pagination={{
        pageSize: pagination?.pageSize,
        current: pagination?.page,
        showSizeChanger: true,
        total: totalElements,
        pageSizeOptions: [5, 10, 15, 20],
        showTotal(total) {
          return "Tổng: " + total;
        },
        onChange: handlePagingChange,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            onRowClick(record);
          }, // click row
        };
      }}
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};

export default ColorTable;
