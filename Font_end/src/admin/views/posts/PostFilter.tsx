import { Input, Select, Button } from "antd";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts, setFilter } from "@/store/reducers/adminPostSlice";

const { Option } = Select;

interface IFilterData {
  keyword: string;
  productName: string;
}

const PostFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminPost);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState<IFilterData>({
    keyword: "",
    productName: "",
  });
  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleSearch = () => {
    dispatch(setFilter({ ...filterData }));
    dispatch(fetchPosts());
  };

  return (
    <div className="flex gap-4">
      {/* Ô tìm kiếm tiêu đề bài viết */}
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={filterData.keyword}
        onChange={(e) => onChangeFilter("keyword", e.target.value)}
        style={{ width: 250 }}
      />

      <Input
        placeholder="Nhập tên sản phẩm"
        value={filterData.productName}
        onChange={(e) => onChangeFilter("productName", e.target.value)}
        style={{ width: 250 }}
      />

      {/* Nút "Tìm kiếm" */}
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default PostFilter;
