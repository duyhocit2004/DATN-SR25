import { Input, Select, Button } from "antd";
import { useState } from "react";
import { IReview } from "./types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReviews, setFilter } from "@/store/reducers/adminReviewSlice";

const { Option } = Select;

interface IFilterData {
  phoneNumber: string;
  productName: string;
  rate: number | null;
  content: string;
}

const ReviewFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminReview);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState<IFilterData>({
    productName: "",
    phoneNumber: "",
    rate: null,
    content: "",
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
    dispatch(fetchReviews());
  };

  return (
    <div className="filter-data w-full flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-1/4"
          placeholder="Nhập tên sản phẩm"
          value={filterData.productName}
          onChange={(e) => onChangeFilter("productName", e.target.value)}
        />
        <Input
          className="!w-1/4"
          placeholder="Nhập số điện thoại"
          value={filterData.phoneNumber}
          onChange={(e) => onChangeFilter("phoneNumber", e.target.value)}
        />

        <Select
          className="!w-1/4"
          value={filterData.rate}
          placeholder={"Chọn tỷ lệ"}
          allowClear
          onChange={(val) => {
            onChangeFilter("rate", val);
          }}
        >
          {[1, 2, 3, 4, 5]?.map((v) => {
            return (
              <Option key={v} value={v}>
                {v}
              </Option>
            );
          })}
        </Select>
        <Input
          className="!w-1/4"
          placeholder="Nhập đoạn nội dung tìm kiếm"
          value={filterData.content}
          onChange={(e) => onChangeFilter("content", e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default ReviewFilter;
