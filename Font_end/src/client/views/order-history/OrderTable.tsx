import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setSelectedOrder } from "@/store/reducers/orderSlice";
import { IOrder } from "@/types/interface";
import { OrderStatusDataClient } from "@/utils/constantData";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect } from "react";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, phoneNumber } = useAppSelector(
    (state) => state.order
  );

  const columns: ColumnsType<IOrder> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      minWidth: 150,
      render: (text, record) => (
        <div>
          <span
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
            onClick={() => showOrderDetail(record)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderTime",
      key: "orderTime",
      minWidth: 150,
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataClient, status)}
        </Tag>
      ),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      minWidth: 150,
      render: (totalPrice) => (
        <span className="font-semibold text-red-500">
          {totalPrice.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      minWidth: 250,
    },
  ];

  useEffect(() => {
    dispatch(fetchOrders({ phoneNumber: phoneNumber }));
  }, []);
  const showOrderDetail = (order: IOrder) => {
    dispatch(setSelectedOrder(order));
  };
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={false}
        scroll={{ x: "100%" }}
      />

      {/* Modal Chi tiết Đơn hàng */}
    </>
  );
};
export default OrderTable;
