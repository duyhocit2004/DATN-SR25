import { Input, Button } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVouchers, setFilter } from "@/store/reducers/adminVoucherSlice";

interface IFilterData {
  name: string;
}

const VoucherFilter: React.FC = () => {
  const { loading } = useAppSelector((state) => state.adminVoucher);
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
    dispatch(fetchVouchers());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          placeholder="Nhập voucher"
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

export default VoucherFilter;
