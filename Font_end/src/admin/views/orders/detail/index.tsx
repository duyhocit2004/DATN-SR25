import React, { useEffect, useState } from "react";
import { Button, Typography, Spin, Select, Card, Tag, Input, Modal, Empty } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "@/api/orderApi";
import {
  EuropeanDatetimeFormatDayjs,
  EuropeanDatetimeMinuteFormatDayjs,
  HttpCodeString,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  EuropeanDateFormatDayjs,
} from "@/utils/constants";
import { IOrder, IProductOrder } from "@/types/interface";
import { showToast } from "@/components/toast";
import { getLabelByValue, getColorOrderStatus } from "@/utils/functions";
import {
  OrderStatusDataAdmin,
  PaymentMethodData,
  PaymentStatusData,
} from "@/utils/constantData";
import dayjs from "dayjs";
import Table, { ColumnsType } from "antd/es/table";
import { cloneDeep } from "lodash";
import "./index.scss";
import adminApi from "@/api/adminApi";

const { Text } = Typography;

const OrderDetail: React.FC = () => {
  const { orderCode } = useParams<{ orderCode: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [originOrder, setOriginOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const [refundModalVisible, setRefundModalVisible] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [refundLoading, setRefundLoading] = useState(false);

  // Calculate filtered products outside JSX
  const filteredProducts = order?.products?.filter(p => p && p.id) || [];
  // Log the filtered data (can be removed later)
  useEffect(() => {
    console.log('Filtered products for table:', filteredProducts);
  }, [order?.products]); // Re-log if products change

  useEffect(() => {
    if (orderCode) {
      fetchOrderDetail();
    }
  }, [orderCode]);

  useEffect(() => {
    if (JSON.stringify(order) !== JSON.stringify(originOrder)) {
      setIsEdit(true);
    }
  }, [order]);

  useEffect(() => {
    console.log("Order Status:", order?.status);
    console.log("Payment Method:", order?.paymentMethod);
    console.log("Payment Status:", order?.paymentStatus);
    console.log("Is Cancel Confirm:", order?.status === OrderStatus.CANCEL_CONFIRM);
    console.log("Is Cancel:", order?.status === OrderStatus.CANCEL);
  }, [order]);

  const columns: ColumnsType<IProductOrder> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value: any, record: any, index: number) => {
        return <span>{index + 1}</span>;
      },
      minWidth: 70,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      minWidth: 150,
      render: (value) => {
        return value ? (
          <img src={value} alt="avatar" width={100} height={100} />
        ) : null;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      minWidth: 250,
      render: (value, record) => (
        <div className={`relative ${record.status === 'out_of_stock' ? 'opacity-50' : ''}`}>
          {record.status === 'out_of_stock' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-gray-500 text-white px-4 py-2 rounded">Sản phẩm đã hết hàng</span>
            </div>
          )}
          {value}
    },
    {
      title: "Biến thể",
      dataIndex: "variant",
      minWidth: 200,
      render(_, record) {
        return (
          <div>
            <div className="color flex gap-2">
              <span className="font-semibold">Màu:</span>
              <span>{record?.color}</span>
              <div
                className={`color w-6 h-6 shrink-0 rounded-[50%]
                  `}
                style={{ backgroundColor: record?.color }}
              ></div>
            </div>
            <div className="size">
              <span className="font-semibold">Size:</span>{" "}
              <span>{record?.size}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      minWidth: 250,
    },
    {
      title: "Giá",
      dataIndex: "price",
      minWidth: 200,
      render(_, record) {
        return (
          <div className="mt-2">
            <div
              className={`${!record?.priceSale
                ? "text-red-600 text-xl font-bold ml-2"
                : "text-gray-400 line-through text-sm"
                }`}
            >
              {record?.priceRegular?.toLocaleString()} VND
            </div>
            {record?.priceSale && (
              <div className="text-red-600 text-xl font-bold ml-2">
                {record?.priceSale?.toLocaleString()} VND
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "amount",
      minWidth: 180,
      render(_, record) {
        return (
          <div className="mt-2 flex flex-col justify-end h-full">
            <span className="text-red-600 text-xl font-bold">
              {(
                record?.quantity *
                (record?.priceSale || record?.priceRegular || 0)
              )?.toLocaleString()}{" "}
              VND
            </span>
          </div>
        );
      },
    },
  ];

  const statusHistoryColumns: ColumnsType<any> = [
    {
      title: "Trạng thái cũ",
      dataIndex: "oldStatus",
      key: "oldStatus",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataAdmin, status)}
        </Tag>
      ),
    },
    {
      title: "Trạng thái mới",
      dataIndex: "newStatus",
      key: "newStatus",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataAdmin, status)}
        </Tag>
      ),
    },
    {
      title: "Người thay đổi",
      dataIndex: "nameChange",
      key: "nameChange",
      minWidth: 150,
    },
    {
      title: "Vai trò",
      dataIndex: "roleChange",
      key: "roleChange",
      minWidth: 150,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      minWidth: 200,
    },
    {
      title: "Thời gian",
      dataIndex: "changeAt",
      key: "changeAt",
      minWidth: 150,
      render: (date) => (date ? dayjs(date).format(EuropeanDatetimeMinuteFormatDayjs) : ""),
    },
  ];

  const paymentStatusHistoryColumns: ColumnsType<any> = [
    {
      title: "Trạng thái cũ",
      dataIndex: "oldStatus",
      key: "oldStatus",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {status ? getLabelByValue(PaymentStatusData, status) : "Chưa có"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái mới",
      dataIndex: "newStatus",
      key: "newStatus",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {status ? getLabelByValue(PaymentStatusData, status) : "Chưa có"}
        </Tag>
      ),
    },
    {
      title: "Người thay đổi",
      dataIndex: "nameChange",
      key: "nameChange",
      minWidth: 150,
      render: (name) => name || "N/A",
    },
    {
      title: "Vai trò",
      dataIndex: "roleChange",
      key: "roleChange",
      minWidth: 150,
      render: (role) => (role ? role.charAt(0).toUpperCase() + role.slice(1) : "N/A"),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      minWidth: 200,
      render: (note) => note || "Không có ghi chú",
    },
    {
      title: "Thời gian",
      dataIndex: "changeAt",
      key: "changeAt",
      minWidth: 150,
      render: (date) => (date ? dayjs(date).format(EuropeanDatetimeMinuteFormatDayjs) : "N/A"),
    },
  ];

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getOrderDetail({ orderCode: orderCode });
      if (response?.status === HttpCodeString.SUCCESS) {
        setOrder(response.data);
        setOriginOrder(response.data);
      } else {
        showToast({
          content: "Lỗi khi lấy chi tiết sản phẩm!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onChangeData = <K extends keyof IOrder>(key: K, value: IOrder[K]) => {
    const data = cloneDeep(order) || ({} as IOrder);
  
    // Reset cancellation reason if status changes away from cancel states
    if (key === "status" && !(value === OrderStatus.CANCEL_CONFIRM || value === OrderStatus.CANCEL)) {
        setCancellationReason('');
    }
  
    // Nếu trạng thái là "CANCEL", "CANCEL CONFIRM" hoặc "DELIVERED", cố định trạng thái
    if (key === "status" && (
      value === OrderStatus.CANCEL || 
      value === OrderStatus.CANCEL_CONFIRM ||
      value === OrderStatus.DELIVERED
    )) {
      data[key] = value;
      
      // Nếu trạng thái là "DELIVERED" và phương thức thanh toán là COD, tự động cập nhật trạng thái thanh toán
      if (value === OrderStatus.DELIVERED && data.paymentMethod === PaymentMethod.COD) {
        data.paymentStatus = PaymentStatus.PAID;
      }
      
      setOrder(data);
      return;
    }
  
    // Cập nhật trạng thái khác
    data[key] = value;
    setOrder(data);
  };

  const isStatusDisabled = (originStatus: string, targetStatus: string) => {
    // Nếu trạng thái đã lưu là "CANCEL", "CANCEL CONFIRM" hoặc "DELIVERED", không cho phép chọn trạng thái khác
    if (
      originStatus === OrderStatus.CANCEL ||
      originStatus === OrderStatus.CANCEL_CONFIRM ||
      originStatus === OrderStatus.DELIVERED
    ) {
      return true; // Vô hiệu hóa tất cả các trạng thái khác
    }

    // Chỉ cho phép chọn trạng thái sau trạng thái đã lưu (originStatus)
    const statusOrder = Object.values(OrderStatus);
    return (
      statusOrder.indexOf(targetStatus) < statusOrder.indexOf(originStatus)
    );
  };

  const handleUpdateOrder = async () => {
    const orderPayload = cloneDeep(order);

    if (!orderPayload) {
        showToast({ content: "Lỗi dữ liệu đơn hàng!", duration: 5, type: "error" });
        return;
    }

    if (orderPayload.status === OrderStatus.CANCEL_CONFIRM || orderPayload.status === OrderStatus.CANCEL) {
        if (!cancellationReason.trim()) {
             showToast({ content: "Vui lòng nhập lý do hủy đơn hàng!", duration: 5, type: "warning" });
             return;
        }
        orderPayload.note = cancellationReason;
    } else {
        orderPayload.note = null; // Set note to null for non-cancel statuses
    }

    try {
      setLoading(true);
      const response = await adminApi.updateOrders(orderPayload);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật đơn hàng thành công!",
          duration: 5,
          type: "success",
        });
        // Update originOrder with the payload that was successfully sent
        setOriginOrder(cloneDeep(orderPayload));
        setIsEdit(false);
        setCancellationReason('');
        fetchOrderDetail();
      } else {
        showToast({
          content: response?.message || "Lỗi khi cập nhật đơn hàng!",
          duration: 5,
          type: "error",
        });
      }
    } catch (error: any) {
       showToast({
         content: error?.message || "Lỗi khi cập nhật đơn hàng!",
         duration: 5,
         type: "error",
       });
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async () => {
    if (!refundReason.trim()) {
      showToast({
        content: 'Vui lòng nhập lý do hoàn tiền',
        duration: 5,
        type: 'warning',
      });
      return;
    }

    if (!order?.id) {
      showToast({
        content: 'Không tìm thấy đơn hàng',
        duration: 5,
        type: 'error',
      });
      return;
    }

    try {
      setRefundLoading(true);
      // Gọi API hoàn tiền
      const response = await orderApi.refundOrder({
        orderId: order.id,
        refundMethod: 'MANUAL',
        adminName: localStorage.getItem('userName') || 'Admin',
        adminEmail: localStorage.getItem('userEmail') || 'admin@example.com'
      });

      if (response?.status === HttpCodeString.SUCCESS) {
        // Cập nhật trạng thái đơn hàng
        const updateResponse = await adminApi.updateOrders({
          ...order,
          id: order.id,
          status: order.status,
          paymentStatus: 'REFUNDED',
          note: refundReason,
        });

        if (updateResponse?.status === HttpCodeString.SUCCESS) {
          showToast({
            content: 'Hoàn tiền thành công',
            duration: 5,
            type: 'success',
          });
          setRefundModalVisible(false);
          setRefundReason('');
          fetchOrderDetail();
        } else {
          showToast({
            content: updateResponse?.message || 'Cập nhật trạng thái thất bại',
            duration: 5,
            type: 'error',
          });
        }
      } else {
        showToast({
          content: response?.message || 'Hoàn tiền thất bại',
          duration: 5,
          type: 'error',
        });
      }
    } catch (error: any) {
      showToast({
        content: error?.response?.data?.message || 'Hoàn tiền thất bại',
        duration: 5,
        type: 'error',
      });
    } finally {
      setRefundLoading(false);
    }
  };

  // Kiểm tra xem có thể hoàn tiền hay không
  const canRefund = 
    order?.paymentStatus === PaymentStatus.PAID && 
    order?.refund_status !== 'REFUNDED' &&
    (order?.status === OrderStatus.CANCEL || order?.status === OrderStatus.CANCEL_CONFIRM);

  const renderPaymentStatusHistory = () => {
    if (!order?.paymentStatusHistories?.length) {
      return <Empty description="Không có lịch sử thay đổi trạng thái thanh toán" />;
    }

    return (
      <Table
        columns={paymentStatusHistoryColumns}
        dataSource={order.paymentStatusHistories}
        rowKey="id"
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    );
  };

  return (
    <div className="order-detail-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">
          Chi tiết đơn hàng: <span className="text-blue-400">{orderCode}</span>
        </h2>
        <div className="action flex justify-end items-center gap-2">
          <Button onClick={() => navigate("/admin/orders")}>Quay lại</Button>
          <Button
            type="primary"
            disabled={!isEdit}
            onClick={() => { handleUpdateOrder() }}
          >
            Lưu
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="body-area pt-6 relative">
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
        <Card
          title="1. Thông tin đơn hàng"
          styles={{
            header: {
              border: "1px solid #d1d5dc",
            },
            body: {
              border: "1px solid #d1d5dc",
            },
          }}
        >
          <div className="grid gap-4">
            {/* Cột trái: Thông tin sản phẩm */}

            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex gap-4">
                <Text strong>Mã đơn hàng:</Text>
                <p>{order?.code}</p>
              </div>
              <div className="flex gap-4">
                <Text strong>Tên khách hàng:</Text>
                <p>{order?.customerName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex gap-4">
                <Text strong>Số điện thoại khách hàng :</Text>
                <p>{order?.phoneNumber}</p>
              </div>
              <div className="flex gap-4">
                <Text strong>Phương thức thanh toán:</Text>
                <p>
                  {getLabelByValue(PaymentMethodData, order?.paymentMethod)}
                </p>
              </div>
            </div>
            <div className=" flex gap-4">
              <Text strong>Địa chỉ :</Text>
              <p>{order?.shippingAddress}</p>
            </div>

            {/* Thêm thông tin hoàn tiền nếu đã hoàn tiền */}
            {order?.refund_status === 'REFUNDED' && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex gap-4">
                  <Text strong>Trạng thái hoàn tiền:</Text>
                  <Tag color="green">Đã hoàn tiền</Tag>
                </div>
                {order?.refunded_at && (
                  <div className="flex gap-4">
                    <Text strong>Thời gian hoàn tiền:</Text>
                    <p>{dayjs(order.refunded_at).format(EuropeanDatetimeMinuteFormatDayjs)}</p>
                  </div>
                )}
                {order?.refund_reason && (
                  <div className="flex gap-4">
                    <Text strong>Lý do hoàn tiền:</Text>
                    <p>{order.refund_reason}</p>
                  </div>
                )}
                {/* Tìm kiếm thông tin người hoàn tiền từ lịch sử */}
                {order?.statusHistories && order.statusHistories.some(history => history.new_status === 'REFUNDED') && (
                  <div className="flex gap-4">
                    <Text strong>Người thực hiện hoàn tiền:</Text>
                    <p>{order.statusHistories.find(history => history.new_status === 'REFUNDED')?.name_change || 'Admin'}</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex gap-4">
                <Text strong>Trạng thái thanh toán :</Text>
                <Tag color={getColorOrderStatus(order?.paymentStatus)}>
                  {order?.paymentStatus ? getLabelByValue(PaymentStatusData, order?.paymentStatus) : "Chưa có"}
                </Tag>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <Text strong>Trạng thái đơn hàng :</Text>
                  <Select
                    placeholder="Trạng thái đơn hàng"
                    className="!w-60"
                    value={order?.status}
                    onChange={(value) => onChangeData("status", value)}
                    options={OrderStatusDataAdmin.map((status) => ({
                      ...status,
                      disabled: isStatusDisabled(
                        originOrder?.status || "",
                        status.value
                      ),
                    }))}
                  />
                </div>
                {(order?.status === OrderStatus.CANCEL_CONFIRM || order?.status === OrderStatus.CANCEL) && (
                  <div className="mt-2 flex flex-col gap-1">
                    <Text strong>Lý do hủy/hủy xác nhận:</Text>
                    <Input.TextArea
                      rows={3}
                      placeholder="Nhập lý do..."
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      maxLength={255}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <Text strong>Thời gian đặt hàng :</Text>
              <p>
                {order?.orderTime
                  ? dayjs(order?.orderTime).format(
                    EuropeanDateFormatDayjs
                  )
                  : ""}
              </p>
            </div>
          </div>
        </Card>
        <Card
          className="!mt-4"
          title="2. Thông tin sản phẩm"
          styles={{
            header: {
              border: "1px solid #d1d5dc",
            },
            body: {
              border: "1px solid #d1d5dc",
            },
          }}
        >
          <Table<IProductOrder>
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={filteredProducts}
            tableLayout="auto"
            pagination={false}
            loading={loading}
            scroll={{ x: "100%" }}
          />
          <div className="total mt-5">
            {(order?.voucherPrice ?? 0) > 0 && (
              <div className="discount text-right">
                Giảm giá:{" "}
                <span className=" text-xl">
                  -{order?.voucherPrice?.toLocaleString()} VND
                </span>
              </div>
            )}

            <div className="total-price text-right">
              Tổng tiền:{" "}
              <span className="text-red-600 text-xl font-bold">
                {order?.totalPrice?.toLocaleString()} VND
              </span>
            </div>
          </div>
        </Card>
        <Card
          className="!mt-4"
          title="3. Lịch sử thay đổi trạng thái đơn hàng"
          styles={{
            header: {
              border: "1px solid #d1d5dc",
            },
            body: {
              border: "1px solid #d1d5dc",
            },
          }}
        >
          <Table
            columns={statusHistoryColumns}
            rowKey={(record) => record.id}
            dataSource={order?.statusHistories}
            tableLayout="auto"
            pagination={false}
            loading={loading}
            scroll={{ x: "100%" }}
          />
        </Card>

        <Card
          className="!mt-4"
          title="4. Lịch sử thay đổi trạng thái thanh toán"
          styles={{
            header: {
              border: "1px solid #d1d5dc",
            },
            body: {
              border: "1px solid #d1d5dc",
            },
          }}
        >
          {renderPaymentStatusHistory()}
        </Card>

        {canRefund && (
          <Button
            type="primary"
            danger
            onClick={() => setRefundModalVisible(true)}
            className="mb-4"
          >
            Hoàn tiền
          </Button>
        )}

        {order?.refund_status === 'REFUNDED' && (
          <Tag color="green" className="mb-4">Đã hoàn tiền</Tag>
        )}

        <Modal
          title="Hoàn tiền đơn hàng"
          open={refundModalVisible}
          onOk={handleRefund}
          onCancel={() => {
            setRefundModalVisible(false);
            setRefundReason('');
          }}
          confirmLoading={refundLoading}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <div className="mb-4">
            <label className="block mb-2">Lý do hoàn tiền</label>
            <Input.TextArea
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              rows={4}
              placeholder="Nhập lý do hoàn tiền..."
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OrderDetail;
