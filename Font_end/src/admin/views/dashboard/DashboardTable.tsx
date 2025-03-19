import adminApi from "@/api/adminApi";
import { IOrder } from "@/types/interface";
import { OrderStatusData } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Spin, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<IOrder> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index: number) => {
        return <span>{index + 1}</span>;
      },
      width: 40,
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
      title: "Trạng thái đơn",
      dataIndex: "status",
      key: "status",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusData, status)}
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
    getData();
  }, []);

  const showOrderDetail = (order: IOrder) => {
    navigate("/admin/orders/" + order?.code);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const payload = {
        pageNum: 1,
        pageSize: 10,
      };
      const response = await adminApi.getOrdersPaging(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = response.data.data;
        setOrders(data);
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-lg font-bold mb-4">Bảng đơn hàng</h2>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: "100%" }}
        loading={loading}
      />
    </div>
  );
};

export default DashboardTable;
