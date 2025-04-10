
import useWindowSize from "@/hooks/useWindowSize";
import orderApi from "@/api/orderApi"; // Import API gọi dữ liệu
import { Button, Input, Popover, message, Spin } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import OrderFilter from "./OrderFilter";
import OrderTable from "./OrderTable";
import { HttpCodeString } from "@/utils/constants";
import { useAppDispatch } from "@/store/hooks";
import { setOrders, setHasOrder, setIsSearched, setPhoneNumber } from "@/store/reducers/orderSlice";

const ListOrder = () => {
  const { isMobile } = useWindowSize();
  const dispatch = useAppDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Hàm tìm kiếm đơn hàng theo số điện thoại
  const handleSearchOrders = async () => {
    if (!phone.trim()) {
      message.warning("Vui lòng nhập số điện thoại để tìm kiếm.");
      return;
    }

    const payload = { phoneNumber: phone.trim() };
    setLoading(true);
    dispatch(setPhoneNumber(phone.trim()));

    try {
      const response = await orderApi.getOrders(payload);

      console.log("Phản hồi từ API:", response); // Kiểm tra toàn bộ dữ liệu trả về

      const orders = response?.data?.orders || response?.data || [];

      if (
        response?.status === HttpCodeString.SUCCESS &&
        orders.length > 0
      ) {
        dispatch(setOrders(orders));
        dispatch(setHasOrder(true));
        message.success(`Đã tìm thấy ${orders.length} đơn hàng.`);
      } else {
        dispatch(setOrders([]));
        dispatch(setHasOrder(false));
        message.info("Không tìm thấy đơn hàng nào.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      dispatch(setOrders([]));
      dispatch(setHasOrder(false));
      message.error("Đã xảy ra lỗi khi tìm kiếm đơn hàng.");
    } finally {
      dispatch(setIsSearched(true));
      setLoading(false);
    }
  };

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

      {/* Thêm ô nhập số điện thoại và nút tìm kiếm */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded-md"
          allowClear
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          loading={loading}
          onClick={handleSearchOrders}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Hiển thị danh sách đơn hàng */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      ) : (
        <OrderTable />
      )}
    </div>
  );
};

export default ListOrder;
