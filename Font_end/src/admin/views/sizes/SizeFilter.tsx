import { Input, Button } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSizes, setFilter } from "@/store/reducers/adminSizeSlice";

interface IFilterData {
  name: string;
}

const SizeFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminSize);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState<IFilterData>({
    name: "",
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
    dispatch(fetchSizes());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          placeholder="Nhập size"
          value={filterData.name}
          onChange={(e) => onChangeFilter("name", e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SizeFilter;
