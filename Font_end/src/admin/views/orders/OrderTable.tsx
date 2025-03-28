import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setPagination } from "@/store/reducers/adminOrderSlice";
import { IOrder } from "@/types/interface";
import { OrderStatusDataAdmin } from "@/utils/constantData";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminOrder
  );
  const columns: ColumnsType<IOrder> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value: any, record: any, index: number) => {
        return (
          <span>
            {(pagination?.page - 1) * pagination?.pageSize + index + 1}
          </span>
        );
      },
      minWidth: 70,
    },
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
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
      minWidth: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      minWidth: 150,
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      key: "status",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataAdmin, status)}
        </Tag>
      ),
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      minWidth: 180,
      render: (paymentStatus) => (
        <Tag color={getColorOrderStatus(paymentStatus)}>
          {getLabelByValue(OrderStatusDataAdmin, paymentStatus)}
        </Tag>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      minWidth: 180,
      render: (paymentStatus) => (
        <Tag color={getColorOrderStatus(paymentStatus)}>
          {getLabelByValue(OrderStatusDataAdmin, paymentStatus)}
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
  const showOrderDetail = (order: IOrder) => {
    navigate("/admin/orders/" + order?.code);
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchOrders());
  };
  return (
    <Table<IOrder>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={orders}
      pagination={{
        pageSize: pagination?.pageSize,
        current: pagination?.page,
        showSizeChanger: true,
        total: totalElements,
        pageSizeOptions: [5, 10, 15, 20],
        showTotal(total, range) {
          return "Tổng: " + total;
        },
        onChange: handlePagingChange,
      }}
      // onRow={(record) => {
      //   return {
      //     onClick: () => {
      //       onRowClick(record);
      //     }, // click row
      //   };
      // }}
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};
export default OrderTable;
