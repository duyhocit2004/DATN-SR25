import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import {
  MoneyCollectOutlined,
  ProductOutlined,
  ReconciliationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Radio, RadioChangeEvent, Spin, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { YearPicker } = DatePicker;

interface IStats {
  title: string;
  key: string;
  value: number;
  icon: any;
  path: string;
}

interface DashboardStatsProps {
  filterType: string;
  setFilterType: (filterType: string) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const DashboardStats = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
}: DashboardStatsProps) => {
  const navigate = useNavigate();
  const defaultStats: IStats[] = [
    {
      title: "Đơn hàng",
      key: "order",
      value: 0,
      icon: <ReconciliationOutlined />,
      path: "/admin/orders",
    },
    {
      title: "Sản phẩm",
      key: "product",
      value: 0,
      icon: <ProductOutlined />,
      path: "/admin/products",
    },
    {
      title: "Doanh thu",
      key: "revenue",
      value: 0,
      icon: <MoneyCollectOutlined />,
      path: "/admin",
    },
    {
      title: "Người dùng",
      key: "user",
      value: 0,
      icon: <UserOutlined />,
      path: "/admin/accounts",
    },
  ];

  const [statsData, setStatsData] = useState<IStats[]>(defaultStats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [filterType, selectedDate]);

  const getData = async () => {
    setLoading(true);
    try {
      const payload: { time: string; date?: string } = {
        time: filterType,
      };
      if ((filterType === "day" || filterType === "year") && selectedDate) {
        // For year filter, send date as YYYY-01-01
        payload.date =
          filterType === "year" ? `${selectedDate}-01-01` : selectedDate;
      }
      const response = await adminApi.getDashboardStats(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = response.data;
        const newStats = defaultStats.map((stat) => {
          const key = stat.key as keyof typeof data;
          // Ensure value is a number, default to 0 if null or undefined
          const value = data[key] != null && !isNaN(Number(data[key])) ? Number(data[key]) : 0;
          return { ...stat, value };
        });
        setStatsData(newStats);
      } else {
        setStatsData(defaultStats);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setStatsData(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilterType(e.target.value);
    if (e.target.value !== "day" && e.target.value !== "year") {
      setSelectedDate(null); // Reset date for non-day/year filters
    }
  };

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString || null);
  };

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Thống kê</h2>
        {/* <div className="flex items-center gap-4">
          <Radio.Group value={filterType} onChange={handleFilterChange}>
            <Radio.Button value="day">Ngày</Radio.Button>
            <Radio.Button value="week">Tuần</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="quarter">Quý</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>
          {filterType === "day" && (
            <DatePicker
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              placeholder="Chọn ngày"
            />
          )}
          {filterType === "year" && (
            <YearPicker
              onChange={handleDateChange}
              format="YYYY"
              placeholder="Chọn năm"
            />
          )}
        </div> */}
      </div>
      <div className="grid grid-cols-4 gap-4">
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
          <div
            key={index}
            className="p-6 border border-gray-300 rounded-2xl cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(stat.path)}
          >
            <div className="text-3xl p-6 bg-gray-100 rounded-lg w-16 h-16 flex justify-center items-center mb-6">
              {stat.icon}
            </div>
            <div>
              <h3 className="text-sm text-gray-500">{stat.title}</h3>
              <p className="text-xl font-semibold">
                {stat.key === "revenue"
                  ? `${(stat.value || 0).toLocaleString("vi-VN")} đ`
                  : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;