import useWindowSize from "@/hooks/useWindowSize";
import OrderFilter from "./OrderFilter";
import { Button, Popover } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useState } from "react";
import OrderTable from "./OrderTable";

const ListOrder = () => {
  const { isMobile } = useWindowSize();
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <div className="list-order-container">
      {isMobile ? (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách đơn hàng</h2>
          <Popover
            placement="bottomRight"
            rootClassName="!max-w-4/5"
            content={<OrderFilter />}
            title="Bộ lọc"
            trigger="click"
            visible={filterVisible}
            onOpenChange={setFilterVisible}
          >
            <Button icon={<FilterOutlined />} />
          </Popover>
        </div>
      ) : (
        <div className="header-section">
          <h2 className="text-lg font-semibold mb-4">Danh sách đơn hàng</h2>
          <OrderFilter />
        </div>
      )}
      <OrderTable />
    </div>
  );
};
export default ListOrder;
