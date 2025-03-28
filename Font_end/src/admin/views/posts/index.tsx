import { useEffect, useState } from "react";
import PostFilter from "./PostFilter";
import PostTable from "./PostTable";
import { posts as initialPosts } from "./data";
import { IPost } from "./types";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { fetchPosts } from "@/store/reducers/adminPostSlice";

const PostsPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const handleAdd = () => {
    navigate("/admin/posts/create");
  };

  return (
    <div className="list-product-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <PostFilter />
      </div>
      <div className="header-bottom mb-4">
        <div className="actions">
          <Button
            className="w-100px"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <PostTable />
    </div>
  );
};

export default PostsPage;
