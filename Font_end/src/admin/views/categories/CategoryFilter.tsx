import { Input, Select, Button } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  setFilter,
} from "@/store/reducers/adminCategorySlice";

const { Option } = Select;

interface IFilterData {
  keyword: string;
  parentId: number | null;
  rate: number | null;
  content: string;
}

const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { parentCategories, loading } = useAppSelector(
    (state) => state.adminCategory
  );
  const [filterData, setFilterData] = useState<IFilterData>({
    keyword: "",
    parentId: null,
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
    dispatch(fetchCategories());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          placeholder="Tìm kiếm danh mục"
          value={filterData.keyword}
          onChange={(e) => onChangeFilter("keyword", e.target.value)}
        />

        <Select
          className="!w-96"
          value={filterData.parentId}
          placeholder={"Chọn danh mục cha"}
          allowClear
          onChange={(val) => {
            onChangeFilter("parentId", val);
          }}
        >
          {parentCategories?.map((v) => {
            return (
              <Option key={v.id} value={v.id}>
                {v.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default CategoryFilter;
