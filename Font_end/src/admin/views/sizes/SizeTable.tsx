import { Table } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteSize,
  fetchSizes,
  setPagination,
  setSelectedSize,
} from "@/store/reducers/adminSizeSlice";
import dayjs, { Dayjs } from "dayjs";
import { ISize } from "@/types/interface";


const SizeTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sizes, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminSize
  );

  const columns = [
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
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      minWidth: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      minWidth: 200,
      render: (createdAt: Dayjs) => {
        return (
          <div>{createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>
        );
      },
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   render: (_, record: IResponseSize) => (
    //     <Button
    //       type="link"
    //       onClick={() => navigate(`/admin/categories/${record.id}`)}
    //     >
    //       Xem chi tiết
    //     </Button>
    //   ),
    // },
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
        showTotal(total, range) {
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
