import { useEffect, useState } from "react";
import { Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import { IOrder } from "@/types/interface";

interface Product {
  id: string | number;
  name: string;
  totalOrders?: number;
  totalCancelled?: number;
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
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (amount) => `${amount?.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => date ? new Date(date).toLocaleDateString("vi-VN") : "",
    },
  ];

  const productColumns: ColumnsType<Product> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số đơn hàng",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
  ];

  const cancelledProductColumns: ColumnsType<Product> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số đơn hủy",
      dataIndex: "totalCancelled",
      key: "totalCancelled",
    },
  ];

  return (
    <div className="dashboard-tables">
      <div className="table-section">
        <h2>Đơn hàng mới nhất</h2>
        <Table
          columns={orderColumns}
          dataSource={latestOrders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </div>

      <div className="table-section">
        <h2>Sản phẩm được bán chạy nhất</h2>
        <Table
          columns={productColumns}
          dataSource={popularProducts}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </div>

      <div className="table-section">
        <h2>Sản phẩm bị hủy đơn nhiều nhất</h2>
        <Table
          columns={cancelledProductColumns}
          dataSource={mostCancelledProducts}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardTables; 