import { Button, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSize,
  fetchSizes,
  setPagination,
  setSelectedSize,
} from "@/store/reducers/adminSizeSlice";
import dayjs, { Dayjs } from "dayjs";
import { ISize } from "@/types/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

const SizeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sizes, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminSize
  );

  const columns: ColumnsType<ISize> = [
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
      title: "Size",
      dataIndex: "size",
      key: "size",
      minWidth: 300,
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
      fixed: "right",
      render: (_, record) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteSize(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDeleteSize = async (sizeId: number) => {
    dispatch(deleteSize(sizeId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchSizes());
  };

  const onRowClick = (record: ISize) => {
    dispatch(setSelectedSize(record));
  };

  return (
    <Table<ISize>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={sizes}
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

export default SizeTable;
