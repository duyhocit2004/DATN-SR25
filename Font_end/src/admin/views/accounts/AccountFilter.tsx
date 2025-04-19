import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAccounts, setFilter } from "@/store/reducers/adminAccountSlice";
import { PersonTypeData, RoleData } from "@/utils/constantData";
import { Button, Input, Select } from "antd";
import { useState } from "react";

interface IFilterData {
  keyword: string;
  role: string | null;
}

const AccountFilter = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.adminAccount);
  const [filterData, setFilterData] = useState<IFilterData>({
    keyword: "",
    role: null,
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
    dispatch(fetchAccounts());
  };
  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          value={filterData.keyword}
          placeholder={"Tìm kiếm Họ và tên"}
          defaultValue={""}
          maxLength={200}
          onChange={(val) => {
            onChangeFilter("keyword", val.target.value);
          }}
        />

        <Select
          className="!w-96"
          options={RoleData}
          allowClear
          onChange={(value: string) => {
            onChangeFilter("role", value);
          }}
          placeholder="Chọn vai trò"
        />
      </div>
      <Button type="primary" onClick={handleSearch} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};
export default AccountFilter;
