import { Button, Select } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBanners, setFilter } from "@/store/reducers/adminBannerSlice";
import { BannerTypeData } from "@/utils/constantData";

interface IFilterData {
  type: string | null;
}
const BannerFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminBanner);
  const dispatch = useAppDispatch();
  const [filterData, setFilterData] = useState<IFilterData>({
    type: null,
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
    dispatch(fetchBanners());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Select
          className="!w-96"
          value={filterData.type}
          placeholder={"Chọn loại banner"}
          options={BannerTypeData}
          allowClear
          onChange={(val) => {
            onChangeFilter("type", val);
          }}
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default BannerFilter;
