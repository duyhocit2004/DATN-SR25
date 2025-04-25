import adminApi from "@/api/adminApi";
import axiosClient from "@/configs/axiosClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setPagination, setOrders } from "@/store/reducers/adminOrderSlice";
import { IOrder } from "@/types/interface";
import { OrderStatusDataAdmin, PaymentMethodData, PaymentStatusData } from "@/utils/constantData";
import { HttpCodeString, OrderStatus, PaymentStatus, PaymentMethod } from "@/utils/constants";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Button, message, Table, Tag, Modal, Radio, Input } from "antd";
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

  // Sort orders by orderTime in descending order
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.orderTime).getTime();
    const dateB = new Date(b.orderTime).getTime();
    return dateB - dateA;
  });

  const [loadingRefund, setLoadingRefund] = useState<number | null>(null);
  const [refundModalVisible, setRefundModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [refundLoading, setRefundLoading] = useState(false);

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
      minWidth: 150,
      render: (_, record: IOrder) => {
        const canRefund = 
          (record.status === OrderStatus.CANCEL || record.status === OrderStatus.CANCEL_CONFIRM) && 
          record.paymentMethod === PaymentMethod.ONLINE &&
          record.paymentStatus === PaymentStatus.PAID &&
          record.refund_status !== 'REFUNDED';

        return (
          <div className="flex flex-row gap-2 justify-center">
            {canRefund ? (
              <Button
                type="primary"
                danger
                onClick={() => handleRefund(record)}
              >
                Hoàn tiền
              </Button>
            ) : record.refund_status === 'REFUNDED' ? (
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

  const handleRefund = (order: IOrder) => {
    navigate("/admin/orders/" + order?.code);
  };

  const handleRefundConfirm = async () => {
    if (!selectedOrder?.id || !refundReason.trim()) {
      message.error('Vui lòng nhập lý do hoàn tiền');
      return;
    }

    try {
      setRefundLoading(true);
      const response = await adminApi.refundOrder({
        orderId: selectedOrder.id,
        refund_reason: refundReason
      });

      console.log('Response from refund API:', response);

      if (response?.status === 200) {
        message.success('Hoàn tiền thành công');
        setRefundModalVisible(false);
        setRefundReason('');
        setSelectedOrder(null);
        dispatch(fetchOrders());
      } else {
        message.error(response?.message || 'Hoàn tiền thất bại');
      }
    } catch (error: any) {
      console.error('Lỗi hoàn tiền:', error);
      if (error.response) {
        console.error('Error response:', error.response);
        message.error(error.response.data?.message || 'Hoàn tiền thất bại');
      } else {
        message.error('Hoàn tiền thất bại: Không thể kết nối đến server');
      }
    } finally {
      setRefundLoading(false);
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

  // Thêm useEffect để theo dõi thay đổi của orders
  useEffect(() => {
    // Cập nhật lại giao diện khi orders thay đổi
    console.log('Orders updated:', orders);
  }, [orders]);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Table
        columns={columns}
        dataSource={sortedOrders}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: totalElements,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} của ${total} đơn hàng`,
          onChange: (page, pageSize) => {
            dispatch(setPagination({ page, pageSize }));
            dispatch(fetchOrders());
          },
        }}
        loading={loading}
        scroll={{ x: 1500 }}
      />

      <Modal
        title="Xác nhận hoàn tiền"
        open={refundModalVisible}
        onOk={handleRefundConfirm}
        onCancel={() => {
          setRefundModalVisible(false);
          setRefundReason('');
          setSelectedOrder(null);
        }}
        confirmLoading={refundLoading}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <div className="mb-4">
          <p className="mb-2">Bạn có chắc chắn muốn hoàn tiền cho đơn hàng này?</p>
          <p className="mb-2">Mã đơn hàng: <strong>{selectedOrder?.code}</strong></p>
          <p className="mb-2">Số tiền: <strong>{selectedOrder?.totalPrice.toLocaleString()} đ</strong></p>
        </div>
        <div>
          <p className="mb-2">Lý do hoàn tiền:</p>
          <Input.TextArea
            rows={4}
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            placeholder="Nhập lý do hoàn tiền..."
          />
        </div>
      </Modal>
    </div>
  );
};
export default OrderTable;
