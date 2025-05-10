import orderApi from "@/api/orderApi";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch } from "@/store/hooks";
import { setHasOrder, setIsSearched, setPhoneNumber } from "@/store/reducers/orderSlice";
import { HttpCodeString } from "@/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, message } from "antd";
import { useState, useEffect } from "react";

const CheckPhoneNumber = () => {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { token, user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      checkOrderByUser(user.id);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSearchOrders = () => {
    if (!phone.trim()) {
      message.warning("Vui lòng nhập số điện thoại để tìm kiếm.");
      return;
    }
    checkOrderByPhone(phone.trim());
  };

  const checkOrderByPhone = async (phoneNumber: string) => {
    const payload = { receiverPhoneNumber: phoneNumber };
    setLoading(true);
    dispatch(setPhoneNumber(phoneNumber));
    try {
      const response = await orderApi.getOrders(payload);
      if (
        response?.status === HttpCodeString.SUCCESS &&
        response.data?.length > 0
      ) {
        dispatch(setHasOrder(true));
      } else {
        dispatch(setHasOrder(false));
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      dispatch(setHasOrder(false));
      message.error("Đã xảy ra lỗi khi tìm kiếm đơn hàng.");
    } finally {
      dispatch(setIsSearched(true));
      setLoading(false);
    }
  };

  const checkOrderByUser = async (userId: number) => {
    const payload = { usersId: userId };
    setLoading(true);
    try {
      const response = await orderApi.getOrders(payload);
      if (
        response?.status === HttpCodeString.SUCCESS &&
        response.data?.length > 0
      ) {
        dispatch(setHasOrder(true));
      } else {
        dispatch(setHasOrder(false));
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      dispatch(setHasOrder(false));
      message.error("Đã xảy ra lỗi khi tìm kiếm đơn hàng.");
    } finally {
      dispatch(setIsSearched(true));
      setLoading(false);
    }
  };

  // Nếu đã đăng nhập thì không hiển thị gì cả (chỉ tự động lấy đơn hàng)
  if (user) return null;

  return (
    <div className="check-phone-number-container">
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      <div className="text-center md:w-[500px] mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Tra cứu đơn hàng
        </h2>
        <Input
          placeholder="Nhập số điện thoại người nhận"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 p-2 border rounded-md"
          allowClear
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="mt-3 w-full"
          onClick={handleSearchOrders}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default CheckPhoneNumber;
