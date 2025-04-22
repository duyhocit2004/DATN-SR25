import adminApi from "@/api/adminApi";
import axiosClient from "@/configs/axiosClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setPagination, setOrders } from "@/store/reducers/adminOrderSlice";
import { IOrder } from "@/types/interface";
import { OrderStatusDataAdmin, PaymentMethodData, PaymentStatusData } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Button, message, Table, Tag, Modal, Radio } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminOrder
  );
  const [loadingRefund, setLoadingRefund] = useState<number | null>(null);
  const [refundModalVisible, setRefundModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [refundMethod, setRefundMethod] = useState('DIRECT');

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
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 150,
      render: (record: IOrder) => {
        const canRefund = 
          (record.status === "Cancel Confirm" || record.status === "Cancel") && 
          record.paymentMethod === "ONLINE" &&
          record.paymentStatus === "PAID" &&
          !record.refundCompleted;

        return (
          <div className="flex gap-2 justify-center">
            {canRefund ? (
              <Button
                type="primary"
                danger
                loading={loadingRefund === record.id}
                onClick={() => handleRefund(record.id)}
              >
                Hoàn tiền
              </Button>
            ) : record.refundCompleted ? (
              <Tag color="green">Đã hoàn tiền</Tag>
            ) : null}
          </div>
        );
      },
    },
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

  const handleRefundConfirm = async () => {
    if (!selectedOrderId) return;

    try {
      setLoadingRefund(selectedOrderId);
      const response = await adminApi.refundOrder({ 
        orderId: selectedOrderId,
        refundMethod 
      });
      
      if (response?.status === HttpCodeString.SUCCESS) {
        // Đóng modal trước
        setRefundModalVisible(false);
        setSelectedOrderId(null);
        setRefundMethod('DIRECT');
        
        // Cập nhật trạng thái đơn hàng trong danh sách
        const updatedOrders = orders.map(order => {
          if (order.id === selectedOrderId) {
            return {
              ...order,
              refundCompleted: true,
              payment_status: 'REFUNDED'
            };
          }
          return order;
        });
        
        // Cập nhật state orders
        dispatch(setOrders(updatedOrders));
        
        const successMessage = refundMethod === 'DIRECT'
          ? "Hoàn tiền thành công! Vui lòng kiểm tra VNPay để xác nhận giao dịch."
          : "Đã gửi mã QR hoàn tiền qua email khách hàng! Vui lòng kiểm tra email.";
        
        message.success({
          content: successMessage,
          duration: 5,
          style: {
            marginTop: '15vh',
          },
        });
      } else {
        const errorMessage = refundMethod === 'DIRECT'
          ? "Hoàn tiền qua VNPay thất bại! Vui lòng thử lại sau."
          : "Gửi mã QR hoàn tiền thất bại! Vui lòng thử lại sau.";
          
        message.error({
          content: errorMessage,
          duration: 5,
          style: {
            marginTop: '15vh',
          },
        });
      }
    } catch (error) {
      console.error("Lỗi khi hoàn tiền:", error);
      const errorMessage = refundMethod === 'DIRECT'
        ? "Đã xảy ra lỗi khi hoàn tiền qua VNPay! Vui lòng thử lại sau."
        : "Đã xảy ra lỗi khi gửi mã QR hoàn tiền! Vui lòng thử lại sau.";
        
      message.error({
        content: errorMessage,
        duration: 5,
        style: {
          marginTop: '15vh',
        },
      });
    } finally {
      setLoadingRefund(null);
    }
  };

  const handleRefund = (orderId: number) => {
    setSelectedOrderId(orderId);
    setRefundModalVisible(true);
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

  // Thêm useEffect để theo dõi thay đổi của orders
  useEffect(() => {
    // Cập nhật lại giao diện khi orders thay đổi
    console.log('Orders updated:', orders);
  }, [orders]);
  
  return (
    <>
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
        tableLayout="auto"
        loading={loading}
        scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
      />
      
      <Modal
        title="Chọn phương thức hoàn tiền"
        open={refundModalVisible}
        onOk={handleRefundConfirm}
        onCancel={() => {
          setRefundModalVisible(false);
          setSelectedOrderId(null);
          setRefundMethod('DIRECT');
        }}
        okText="Xác nhận"
        cancelText="Hủy"
        confirmLoading={loadingRefund !== null}
        maskClosable={false}
        closable={!loadingRefund}
        keyboard={!loadingRefund}
      >
        <Radio.Group
          onChange={(e) => setRefundMethod(e.target.value)}
          value={refundMethod}
          className="flex flex-col gap-4"
          disabled={loadingRefund !== null}
        >
          <Radio value="DIRECT" className="text-gray-700">
            Hoàn tiền trực tiếp qua VNPay
          </Radio>
          <Radio value="QR_CODE" className="text-gray-700">
            Gửi mã QR để hoàn tiền
          </Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};
export default OrderTable;
