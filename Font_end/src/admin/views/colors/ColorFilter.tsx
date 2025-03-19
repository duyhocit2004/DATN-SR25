import { Input, Button } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchColors, setFilter } from "@/store/reducers/adminColorSlice";

interface IFilterData {
  code: string;
}

const ColorFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminColor);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState<IFilterData>({
    code: "",
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
    dispatch(fetchColors());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          placeholder="Nhập mã màu"
          onChange={(e) => onChangeFilter("code", e.target.value)}
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default ColorFilter;
