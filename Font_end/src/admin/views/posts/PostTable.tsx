import { Table, Avatar, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { IResponsePost } from "./types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deletePost,
  fetchPosts,
  setPagination,
} from "@/store/reducers/adminPostSlice";
import dayjs, { Dayjs } from "dayjs";

const PostTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminPost
  );
  const navigate = useNavigate();

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
      title: "Ảnh",
      dataIndex: "image",
      render: (value: string) => {
        return value ? (
          <img src={value} alt="avatar" width={100} height={100} />
        ) : null;
      },
      minWidth: 150,
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      minWidth: 350,
      render: (product: IResponsePost["product"]) => (
        <div className="flex gap-2 items-center">
          <Avatar shape="square" src={product.image} />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      minWidth: 250,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      minWidth: 200,
      render: (status: IResponsePost["status"]) => (
        <Tag color={status === "Published" ? "green" : "orange"}>{status}</Tag>
      ),
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
    {
      title: "Hành động",
      key: "action",
      minWidth: 150,
      render: (_, record: IResponsePost) => (
        <Button type="link" onClick={() => navigate(`/posts/${record.id}`)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleDeletePost = async (postId: number) => {
    dispatch(deletePost(postId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchPosts());
  };

  return (
    <Table<IResponsePost>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={posts}
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
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};

export default PostTable;
