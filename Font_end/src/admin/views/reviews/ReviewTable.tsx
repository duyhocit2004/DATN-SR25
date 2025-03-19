import { Table, Button, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews, setPagination } from "@/store/reducers/adminReviewSlice";
import { IResponseReview } from "./types";
import { ColumnsType } from "antd/es/table";

const ReviewTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { reviews, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminReview
  );
  const navigate = useNavigate();

  const columns: ColumnsType<IResponseReview> = [
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
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      minWidth: 350,
    },
    {
      title: "Số điện thoại KH",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      minWidth: 200,
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      minWidth: 200,
      render: (rate: number) => <Rate disabled defaultValue={rate} />,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      minWidth: 350,
    },
    {
      title: "Hành động",
      key: "action",
      minWidth: 200,
      fixed: 'right',
      render: (_: any, record: IResponseReview) => (
        <Button
          type="link"
          onClick={() => navigate(`/admin/reviews/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchReviews());
  };

  return (
    <Table<IResponseReview>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={reviews}
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
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};

export default ReviewTable;
