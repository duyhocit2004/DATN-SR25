import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import {
  MoneyCollectOutlined,
  ProductOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface IStats {
  title: string;
  key: string;
  value: number;
  icon: any;
}

const defaultStats: IStats[] = [
  {
    title: "Đơn hàng",
    key: "order",
    value: 0,
    icon: <ReconciliationOutlined />,
  },
  { title: "Sản phẩm", key: "product", value: 0, icon: <ProductOutlined /> },
  {
    title: "Doanh thu",
    key: "revenue",
    value: 0,
    icon: <MoneyCollectOutlined />,
  },
  { title: "Người dùng", key: "user", value: 0, icon: <UserOutlined /> },
];
const DashboardStats = () => {
  const [statsData, setStatsData] = useState<IStats[]>(defaultStats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getDashboardStats(dayjs().get("year"));
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = response.data;
        const newStats = defaultStats.map((stat) => {
          const key = stat.key as keyof typeof data;
          return { ...stat, value: data[key] };
        });
        setStatsData(newStats);
      } else {
        setStatsData(defaultStats);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6 relative">
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
          <Spin />
        </div>
      )}
      {statsData?.map((stat, index) => (
        <div key={index} className="p-6 border border-gray-300 rounded-2xl">
          <div className="text-3xl p-6 bg-gray-100 rounded-lg w-16 h-16 flex justify-center items-center mb-6">
            {stat.icon}
          </div>
          <div>
            <h3 className="text-sm text-gray-500">{stat.title}</h3>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
