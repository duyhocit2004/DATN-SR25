import { useEffect, useState } from "react";
import { Table, message, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import { IOrder } from "@/types/interface";
import dayjs from "dayjs";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { OrderStatusDataAdmin, PaymentMethodData } from "@/utils/constantData";
import {
  BarcodeOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  CarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";


interface Product {
  id: string | number;
  name: string;
  totalOrders?: number;
  totalCancelled?: number;
  successfulOrders?: number;
  cancellationRate?: number;
}

const DashboardTables = () => {
  const [latestOrders, setLatestOrders] = useState<IOrder[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [mostCancelledProducts, setMostCancelledProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch latest orders
        const ordersResponse = await adminApi.getLatestOrders();
        if (ordersResponse?.status === HttpCodeString.SUCCESS) {
          setLatestOrders(ordersResponse.data || []);
        } else {
          message.error("Không thể tải dữ liệu đơn hàng mới nhất");
        }

        // Fetch popular products
        const popularResponse = await adminApi.getPopularProducts();
        if (popularResponse?.status === HttpCodeString.SUCCESS) {
          setPopularProducts(popularResponse.data || []);
        } else {
          message.error("Không thể tải dữ liệu sản phẩm phổ biến");
        }

        // Fetch most cancelled products
        const cancelledResponse = await adminApi.getMostCancelledProducts();
        if (cancelledResponse?.status === HttpCodeString.SUCCESS) {
          setMostCancelledProducts(cancelledResponse.data || []);
        } else {
          message.error("Không thể tải dữ liệu sản phẩm bị hủy nhiều nhất");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        message.error("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Log để debug dữ liệu
  console.log('mostCancelledProducts:', mostCancelledProducts);
  console.log('popularProducts:', popularProducts);
  console.log('latestOrders:', latestOrders);

  const orderColumns: ColumnsType<IOrder> = [
    {
      title: (
        <span>
          <span className="text-blue-500 mr-1">🔖</span>
          Mã đơn hàng
        </span>
      ),
      dataIndex: "code",
      key: "code",
    },
    {
      title: (
        <span>
          <span className="text-purple-500 mr-1">👤</span>
          Khách hàng
        </span>
      ),
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: (
        <span>
          <span className="text-green-500 mr-1">📱</span>
          Số điện thoại
        </span>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: (
        <span>
          <span className="text-orange-500 mr-1">📍</span>
          Địa chỉ giao hàng
        </span>
      ),
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      ellipsis: true,
    },
    {
      title: (
        <span>
          <span className="text-blue-500 mr-1">🛍️</span>
          Số sản phẩm
        </span>
      ),
      dataIndex: "productCount",
      key: "productCount",
    },
    {
      title: (
        <span>
          <span className="text-green-500 mr-1">💳</span>
          Hình thức thanh toán
        </span>
      ),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => (
        <Tag color={getColorOrderStatus(paymentMethod)}>
          {getLabelByValue(PaymentMethodData, paymentMethod)}
        </Tag>
      ),
    },
    {
      title: (
        <span>
          <span className="text-purple-500 mr-1">🚚</span>
          Trạng thái giao hàng
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataAdmin, status)}
        </Tag>
      ),
    },
    {
      title: (
        <span>
          <span className="text-red-500 mr-1">💰</span>
          Tổng tiền
        </span>
      ),
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (amount) => `${amount?.toLocaleString("vi-VN")}đ`,
    },
    {
      title: (
        <span>
          <span className="text-blue-500 mr-1">⏰</span>
          Giờ tạo
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAtTime",
      render: (date) => date ? dayjs(date).format("HH:mm") : "",
    },
    {
      title: (
        <span>
          <span className="text-green-500 mr-1">📅</span>
          Ngày tạo
        </span>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY") : "",
    },
  ];

  const productColumns: ColumnsType<Product> = [
    {
      title: (
        <span>
          <span className="text-blue-500 mr-1">📦</span>
          Tên sản phẩm
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span>
          <span className="text-green-500 mr-1">🚚</span>
          Số đơn hàng đã giao
        </span>
      ),
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: (
        <span>
          <span className="text-red-500 mr-1">❌</span>
          Số đơn hủy
        </span>
      ),
      dataIndex: "totalCancelled",
      key: "totalCancelled",
    },
    {
      title: (
        <span>
          <span className="text-purple-500 mr-1">📊</span>
          Tổng số đơn hàng
        </span>
      ),
      dataIndex: "totalOrders",
      key: "totalOrders",
      render: (_, record) => (record.totalOrders || 0) + (record.totalCancelled || 0),
    },
    {
      title: (
        <span>
          <span className="text-green-500 mr-1">✅</span>
          Số đơn thành công
        </span>
      ),
      dataIndex: "successfulOrders",
      key: "successfulOrders",
      render: (_, record) => (record.totalOrders || 0) - (record.totalCancelled || 0),
      sorter: (a, b) => {
        const aSuccess = (a.totalOrders || 0) - (a.totalCancelled || 0);
        const bSuccess = (b.totalOrders || 0) - (b.totalCancelled || 0);
        return bSuccess - aSuccess;
      },
    },
  ];

  const cancelledProductColumns: ColumnsType<Product> = [
    {
      title: (
        <span>
          <span className="text-blue-500 mr-1">📦</span>
          Tên sản phẩm
        </span>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <span>
          <span className="text-red-500 mr-1">❌</span>
          Số đơn hủy
        </span>
      ),
      dataIndex: "totalCancelled",
      key: "totalCancelled",
    },
    {
      title: (
        <span>
          <span className="text-orange-500 mr-1">📊</span>
          Tỷ lệ hủy (%)
        </span>
      ),
      dataIndex: "cancellationRate",
      key: "cancellationRate",
      render: (_, record) => {
        if (!record.totalOrders) return "0%";
        const rate = ((record.totalCancelled || 0) / record.totalOrders) * 100;
        return `${rate.toFixed(1)}%`;
      },
      sorter: (a, b) => {
        const aRate = a.totalOrders ? ((a.totalCancelled || 0) / a.totalOrders) * 100 : 0;
        const bRate = b.totalOrders ? ((b.totalCancelled || 0) / b.totalOrders) * 100 : 0;
        return bRate - aRate;
      },
    },
  ];

  return (
    <div className="dashboard-tables">
      <div className="table-section bg-white p-6 rounded-lg border border-gray-200 slide-in">
        <h2 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary pb-2 typing">
          <span className="text-blue-500 mr-2">📋</span>
          Đơn hàng mới nhất
        </h2>
        <Table
          columns={orderColumns}
          dataSource={latestOrders}
          rowKey="id"
          pagination={false}
          loading={loading}
          className="shadow-md rounded-lg"
          bordered
        />
      </div>

      <div className="table-section mt-8 bg-white p-6 rounded-lg border border-gray-200 slide-in">
        <h2 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary pb-2 typing">
          <span className="text-green-500 mr-2">🏆</span>
          Sản phẩm bán chạy nhất (dựa trên số đơn thành công)
        </h2>
        <Table
          columns={productColumns}
          dataSource={popularProducts}
          rowKey="id"
          pagination={false}
          loading={loading}
          className="shadow-md rounded-lg"
          bordered
        />
      </div>

      <div className="table-section mt-8 bg-white p-6 rounded-lg border border-gray-200 slide-in">
        <h2 className="text-xl font-bold mb-4 text-primary border-b-2 border-primary pb-2 typing">
          <span className="text-red-500 mr-2">⚠️</span>
          Sản phẩm có tỷ lệ hủy đơn cao nhất
        </h2>
        <Table
          columns={cancelledProductColumns}
          dataSource={mostCancelledProducts}
          rowKey="id"
          pagination={false}
          loading={loading}
          className="shadow-md rounded-lg"
          bordered
        />
      </div>
    </div>
  );
};

export default DashboardTables; 