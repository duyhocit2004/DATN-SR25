import React, { useEffect, useState } from "react";
import { Button, Typography, Spin, Select, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "@/api/orderApi";
import {
  EuropeanDatetimeMinuteFormatDayjs,
  HttpCodeString,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/utils/constants";
import { IOrder, IProductOrder } from "@/types/interface";
import { showToast } from "@/components/toast";
import { getLabelByValue } from "@/utils/functions";
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
          <span className="text-red-600 text-xl font-bold">
            {(
              record?.quantity *
              (record?.priceSale || record?.priceRegular || 0)
            )?.toLocaleString()}{" "}
            VND
          </span>
        );
      },
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
  
    // Nếu trạng thái là "CANCEL" hoặc "CANCEL CONFIRM", cố định trạng thái
    if (key === "status" && (value === OrderStatus.CANCEL || value === OrderStatus.CANCEL_CONFIRM)) {
      data[key] = value;
      setOrder(data);
      return; // Không cho phép thay đổi trạng thái khác
    }
  
    // Cập nhật trạng thái khác
    data[key] = value;
  
    // Nếu trạng thái là "DELIVERED" và phương thức thanh toán là COD, tự động cập nhật trạng thái thanh toán
    if (data.paymentMethod === PaymentMethod.COD && key === "status" && value === OrderStatus.DELIVERED) {
      data.paymentStatus = PaymentStatus.PAID;
    }
  
    setOrder(data);
  };

  const isStatusDisabled = (originStatus: string, targetStatus: string) => {
    // Nếu trạng thái đã lưu là "CANCEL" hoặc "CANCEL CONFIRM", không cho phép chọn trạng thái khác
    if (
      originStatus === OrderStatus.CANCEL ||
      originStatus === OrderStatus.CANCEL_CONFIRM
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
    try {
      setLoading(true);
      const response = await adminApi.updateOrders(order);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật đơn hàng thành công!",
          duration: 5,
          type: "success",
        });
        setOriginOrder(cloneDeep(order)); // Lưu trạng thái hiện tại vào trạng thái đã lưu
        setIsEdit(false); // Đặt lại trạng thái chỉnh sửa
        navigate("/admin/orders");
      } else {
        showToast({
          content: "Lỗi khi cập nhật đơn hàng!",
          duration: 5,
          type: "error",
        });
      }
    } catch (error) {
      showToast({
        content: "Lỗi khi cập nhật đơn hàng!",
        duration: 5,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
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
                <Text strong>Số điện thoại KH:</Text>
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
              <Text strong>Địa chỉ:</Text>
              <p>{order?.shippingAddress}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex gap-4">
                <Text strong>Trạng thái thanh toán:</Text>
                <Select
                  placeholder="Trạng thái thanh toán"
                  className="!w-40"
                  value={order?.paymentStatus}
                  onChange={(value) => onChangeData("paymentStatus", value)}
                  options={PaymentStatusData.map((status) => ({
                    ...status,
                    disabled:
                      order?.status === OrderStatus.CANCEL ||
                      order?.status === OrderStatus.CANCEL_CONFIRM, // Vô hiệu hóa nếu trạng thái đơn hàng là "CANCEL" hoặc "CANCEL CONFIRMED"
                  }))}
                />
              </div>
              <div className="flex gap-4">
                <Select
                  placeholder="Trạng thái đơn hàng"
                  className="!w-60"
                  value={order?.status}
                  onChange={(value) => onChangeData("status", value)}
                  options={OrderStatusDataAdmin.map((status) => ({
                    ...status,
                    disabled: isStatusDisabled(
                      originOrder?.status || "", // Trạng thái đã lưu
                      // order?.status || "",      // Trạng thái hiện tại
                      status.value              // Trạng thái mục tiêu
                    ),
                  }))}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Text strong>Thời gian đặt hàng:</Text>
              <p>
                {order?.orderTime
                  ? dayjs(order?.orderTime).format(
                    EuropeanDatetimeMinuteFormatDayjs
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
            dataSource={order?.products}
            tableLayout="auto"
            pagination={false}
            loading={loading}
            scroll={{ x: "100%" }}
          />
          <div className="total mt-5">
            {order?.voucherPrice && (
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
      </div>
    </div>
  );
};

export default OrderDetail;
