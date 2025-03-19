import React, { useEffect } from "react";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import ListOrder from "./ListOrder";
import CheckPhoneNumber from "./CheckPhoneNumber";
import { useDispatch } from "react-redux";
import { setIsSearched } from "@/store/reducers/orderSlice";
import OrderDetail from "./detail";

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearched, hasOrder, selectedOrder } = useAppSelector((state) => state.order);

  useEffect(() => {
    return () => {
      dispatch(setIsSearched(false));
    };
  }, []);

  return (
    <div className="order-history-container container mx-auto px-6 pb-6 pt-20">
      {/* <div className="p-6 bg-white rounded-lg shadow-lg"> */}
      {!isSearched && <CheckPhoneNumber />}

      {isSearched && hasOrder && <ListOrder />}
      {isSearched && !hasOrder && (
        <div>Bạn chưa mua sản phẩm nào</div>
      )}
      {isSearched && (
        <Button
          className="mt-4"
          onClick={() => {
            navigate("/");
          }}
        >
          Về trang chủ
        </Button>
      )}
      {
        selectedOrder && <OrderDetail/>
      }
      {/* </div> */}
    </div>
  );
};

export default OrderHistory;
