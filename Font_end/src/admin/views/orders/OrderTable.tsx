import adminApi from "@/api/adminApi";
import axiosClient from "@/configs/axiosClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setPagination } from "@/store/reducers/adminOrderSlice";
import { IOrder } from "@/types/interface";
import { OrderStatusDataAdmin, PaymentMethodData, PaymentStatusData } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Button, message, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminOrder
  );
  const [loadingRefund, setLoadingRefund] = useState<number | null>(null); // Trạng thái loading cho nút hoàn tiền
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
      minWidth: 190,
      render: (paymentStatus) => (
        <Tag color={getColorOrderStatus(paymentStatus)}>
          {getLabelByValue(PaymentStatusData, paymentStatus)}
        </Tag>
      ),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      minWidth: 190,
      render: (paymentMethod) => (
        <Tag color={getColorOrderStatus(paymentMethod)}>
          {getLabelByValue(PaymentMethodData, paymentMethod)}
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
    // {
    //   title: "Hành động",
    //   key: "action",
    //   minWidth: 150,
    //   render: (record: IOrder) => {
    //     console.log("Trạng thái đơn hàng:", record.status); // Kiểm tra trạng thái
    //     return record.status === "Cancel" || record.status === "Cancel Confirm" ? (
    //       <button
    //         className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
    //         onClick={() => handleDeleteOrder(record.id)}
    //       >
    //         Xóa
    //       </button>
    //     ) : null;Set fire. 
    //   },
    // }
    {
      title: "Hành động",
      key: "action",
      minWidth: 150,
      render: (record: IOrder) => {
        return (
          <div className="flex gap-2">
            {/* Nút Xóa
            {(record.status === "Cancel" || record.status === "Cancel Confirm") && (
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteOrder(record.id)}
              >
                Xóa
              </button>
            )} */}

            {/* Nút Hoàn Tiền */}
            {record.paymentMethod === "ONLINE" &&
              record.status === "Cancel" &&
              record.paymentStatus === "PAID" && (
                <Button
                  type="primary"
                  danger
                  loading={loadingRefund === record.id} // Hiển thị trạng thái loading riêng cho từng đơn hàng
                  onClick={() => handleRefund(record.id)}
                >
                  Hoàn Tiền
                </Button>
              )}
          </div>
        );
      },
    }
  ];

  const showOrderDetail = (order: IOrder) => {
    navigate("/admin/orders/" + order?.code);
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
      if (!token) {
        alert("Token không hợp lệ!");
        return;
      }

      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
      if (!confirmDelete) return;
      const response = await adminApi.deleteOrder({ id: orderId });
      if (response?.status === HttpCodeString.SUCCESS) {
        alert("Xóa đơn hàng thành công!");
        dispatch(fetchOrders());
      } else {
        alert("Xóa đơn hàng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      alert("Xóa đơn hàng thất bại!");
    }
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


  const handleRefund = async (orderId: number) => {
    console.log("Gọi hàm handleRefund với orderId:", orderId); // Kiểm tra
    try {
      setLoadingRefund(orderId);
      const response = await adminApi.refundOrder({ orderId });
      console.log("Phản hồi từ API refundOrder:", response); // Kiểm tra phản hồi
      if (response?.success) {
        message.success("Hoàn tiền thành công!");
        dispatch(fetchOrders());
      } else {
        message.error(response?.message || "Hoàn tiền thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi hoàn tiền:", error);
      message.error("Đã xảy ra lỗi khi hoàn tiền!");
    } finally {
      setLoadingRefund(null);
    }
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
