import { Button, Checkbox, Collapse, Popover, Slider } from "antd";
import { useState } from "react";
import { ICategory, IListCategory } from "@/types/interface";
import { FilterOutlined } from "@ant-design/icons";

export interface IFilterData {
  priceRange: [number, number];
  selectedCategories: string[];
}
interface FilterProductProps {
  categories: IListCategory[];
  onFilter: (filterData: IFilterData) => void;
}

const { Panel } = Collapse;
const FilterProduct = ({ categories, onFilter }: FilterProductProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);

  // Hàm áp dụng bộ lọc và đóng Popover
  const applyFilter = () => {
    setPopoverVisible(false); // Đóng popover
    // Lọc lại sản phẩm sau khi áp dụng bộ lọc (đã có trong useEffect)
    const filterData: IFilterData = {
      priceRange: priceRange,
      selectedCategories: selectedCategories,
    };
    onFilter(filterData);
  };
  return (
    <div className="filter-product-container">
      {/* Filter theo danh mục */}
      <Popover
        content={
          <div className="min-w-[250px]">
            <Collapse defaultActiveKey={["2", "3"]} ghost>
              {/* Filter theo danh mục */}
              <Panel header="Danh mục" key="2">
                <Checkbox.Group
                  rootClassName="w-full gap-2"
                  onChange={(values) =>
                    setSelectedCategories(values as string[])
                  }
                >
                  {categories?.map((category) => {
                    return (
                      <Checkbox
                        className="w-full"
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              </Panel>

              {/* Filter theo giá */}
              <Panel header="Khoảng giá" key="3">
                <Slider
                  range
                  min={0}
                  max={100000000}
                  step={10000}
                  defaultValue={priceRange}
                  onChange={(values) =>
                    setPriceRange(values as [number, number])
                  }
                />
                <p>
                  {priceRange[0].toLocaleString()} VND -{" "}
                  {priceRange[1].toLocaleString()} VND
                </p>
              </Panel>
            </Collapse>

            {/* Nút Áp dụng */}
            <div className="flex justify-end mt-4">
              <Button onClick={applyFilter} type="primary">
                Áp dụng
              </Button>
            </div>
          </div>
        }
        title="Bộ lọc"
        trigger="click"
        open={popoverVisible}
        onOpenChange={(visible) => setPopoverVisible(visible)}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Button
          icon={<FilterOutlined />}
          type="primary"
          shape="circle"
          size="large"
          className="ml-4"
        />
      </Popover>
    </div>
  );
};
export default FilterProduct;
