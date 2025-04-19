import { useEffect } from "react";
import OrderFilter from "./OrderFilter";
import OrderTable from "./OrderTable";
import { useAppDispatch } from "@/store/hooks";
import {
  fetchOrders,
} from "@/store/reducers/adminOrderSlice";

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);


  return (
    <div className="list-order-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <OrderFilter />
      </div>
      <OrderTable />
    </div>
  );
};

export default OrdersPage;
