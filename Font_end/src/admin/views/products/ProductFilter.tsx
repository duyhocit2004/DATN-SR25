import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts, setFilter } from "@/store/reducers/adminProductSlice";
import { Button, Cascader, Input } from "antd";
import { useState } from "react";

interface IFilterData {
  keyword: string;
  categoryId: number[] | null;
}

const ProductFilter = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.adminProduct);
  const [filterData, setFilterData] = useState<IFilterData>({
    keyword: "",
    categoryId: null,
  });

  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      const newFilter = { ...prev, [key]: value };
      if (key === "categoryId") {
        handleSearch(newFilter); // Gọi API ngay khi thay đổi danh mục
      }
      return newFilter;
    });
  };

  const handleSearch = (data = filterData) => {
    dispatch(
      setFilter({
        keyword: data.keyword,
        categoryId:
          data.categoryId && data.categoryId?.length > 0
            ? data.categoryId[data.categoryId.length - 1]
            : null,
      })
    );
    dispatch(fetchProducts());
  };

  return (
    <div className="filter-data flex items-center gap-2">
      <div className="control-area flex items-center gap-2 flex-1">
        <Input
          className="!w-96"
          value={filterData.keyword}
          placeholder={"Tìm kiếm"}
          defaultValue={""}
          maxLength={200}
          onChange={(val) => {
            onChangeFilter("keyword", val.target.value);
          }}
        />

        <Cascader
          className="!w-96"
          options={categories?.map((e) => {
            return {
              value: e.id,
              label: e.name,
              children: e.children?.map((child) => {
                return {
                  value: child.id,
                  label: child.name,
                };
              }),
            };
          })}
          onChange={(value: number[]) => {
            onChangeFilter("categoryId", value);
          }}
          placeholder="Chọn danh mục"
        />
      </div>
      <Button type="primary" onClick={() => handleSearch()} loading={loading}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default ProductFilter;
