import adminApi from "@/api/adminApi";
import { IOrder } from "@/types/interface";
import { OrderStatusDataAdmin } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Button, Select, Spin, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DashboardTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columns: ColumnsType<IOrder> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index: number) => <span>{index + 1}</span>,
      width: 40,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      minWidth: 150,
      render: (text, record) => (
        <span
          className="text-blue-500 hover:text-blue-800 cursor-pointer"
          onClick={() => showOrderDetail(record)}
        >
          {text}
        </span>
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
  ];

  useEffect(() => {
    setOrders([]); // Reset danh sách khi filter thay đổi
    setPage(1);
    setHasMore(true);
    getData(1, true);
  }, [statusFilter]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableContainerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
        getData(page + 1);
      }
    };

    const container = tableContainerRef.current;
    if (container) container.addEventListener("scroll", handleScroll);

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, hasMore]);

  const showOrderDetail = (order: IOrder) => {
    navigate("/admin/orders/" + order?.code);
  };

  const getData = async (currentPage: number, isReset = false) => {
    setLoading(true);
    try {
      const payload: any = { pageNum: currentPage, pageSize: 10 };
      if (statusFilter) payload.status = statusFilter;

      const response = await adminApi.getOrdersPaging(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const newOrders = response.data.data;
        setOrders((prevOrders) => (isReset ? newOrders : [...prevOrders, ...newOrders]));

        // Kiểm tra còn dữ liệu không
        setHasMore(newOrders.length > 0);
        if (newOrders.length > 0) setPage(currentPage);
      } else {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-lg font-bold mb-4">Bảng đơn hàng</h2>

      {/* Bộ lọc trạng thái đơn hàng */}
      <div className="flex items-center gap-4 mb-4">
        <Select
          allowClear
          placeholder="Tìm kiếm theo trạng thái"
          onChange={(value) => setStatusFilter(value || null)}
          value={statusFilter}
          className="w-60"
        >
          {OrderStatusDataAdmin.map((status) => (
            <Select.Option key={status.value} value={status.value}>
              {status.label}
            </Select.Option>
          ))}
        </Select>
        <Button onClick={() => setStatusFilter(null)}>Hiển thị tất cả</Button>
      </div>

      {/* Bảng cuộn */}
      <div
        ref={tableContainerRef}
        className="overflow-y-auto"
        style={{ maxHeight: "500px" }} // Đặt chiều cao tối đa để cuộn
      >
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          pagination={false} // Ẩn phân trang vì cuộn vô hạn
          scroll={{ x: "100%" }}
        />
      </div>

      {/* Hiển thị loading khi tải thêm */}
      {loading && (
        <div className="flex justify-center my-4">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
