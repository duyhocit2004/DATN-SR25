import orderApi from "@/api/orderApi";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch } from "@/store/hooks";
import { setHasOrder, setIsSearched, setPhoneNumber } from "@/store/reducers/orderSlice";
import { HttpCodeString } from "@/utils/constants";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";

const CheckPhoneNumber = () => {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { token, user, logout } = useAuth();

  useEffect(() => {
    if (user?.phoneNumber) {
      checkPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  const handleSearchOrders = () => {
    if (!phone.trim()) {
      message.warning("Vui lòng nhập số điện thoại để tìm kiếm.");
      return;
    }
    checkPhoneNumber(phone.trim());
  };

  const checkPhoneNumber = async (phoneNumber: string) => {
    const payload = { phoneNumber };
    setLoading(true);
    dispatch(setPhoneNumber(phoneNumber));  // Ưu tiên số điện thoại truyền vào

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

      {(!user || !user?.phoneNumber) && (
        <div className="text-center md:w-[500px] mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tra cứu đơn hàng
          </h2>
          <Input
            placeholder="Nhập số điện thoại"
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
      )}
    </div>
  );
};

export default CheckPhoneNumber;
