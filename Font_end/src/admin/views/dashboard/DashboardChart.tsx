import adminApi from "@/api/adminApi";
import { IDashboardChart } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Radio, RadioChangeEvent, Spin, DatePicker } from "antd";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Legend,
  Area,
} from "recharts";
const { YearPicker } = DatePicker;

interface IOrderAndRevenue {
  name: string;
  order: number;
  revenue: number;
}

interface DashboardChartProps {
  filterType: string;
  setFilterType: (filterType: string) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const getChartData = (
  filterType: string,
  data: IDashboardChart[],
  selectedYear?: string
): IOrderAndRevenue[] => {
  switch (filterType) {
    case "day":
      return data.map((item) => ({
        name: item.stt,
        order: item.order,
        revenue: item.revenue,
      }));
    case "week":
      return data.map((item) => ({
        name: `Ngày ${item.stt}`,
        order: item.order,
        revenue: item.revenue,
      }));
    case "month":
      return data.map((item) => ({
        name: `Tuần ${item.stt}`,
        order: item.order,
        revenue: item.revenue,
      }));
    case "quarter":
      return data.map((item) => ({
        name: `Tháng ${item.stt}`,
        order: item.order,
        revenue: item.revenue,
      }));
    case "year":
      return data.map((item) => ({
        name: `Tháng ${item.stt}`,
        order: item.order,
        revenue: item.revenue,
      }));
    default:
      return [];
  }
};

const DashboardChart = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
}: DashboardChartProps) => {
  const [loading, setLoading] = useState(false);
  const [orderAndRevenueData, setOrderAndRevenueData] = useState<
    IOrderAndRevenue[]
  >([]);

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
        // For year filter, ensure date is in YYYY-01-01 format
        payload.date =
          filterType === "year" ? `${selectedDate}-01-01` : selectedDate;
      }
      const response = await adminApi.getDashboardChart(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = getChartData(filterType, response.data, selectedDate);
        setOrderAndRevenueData(data);
      } else {
        setOrderAndRevenueData([]);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setOrderAndRevenueData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilterType(e.target.value);
    if (e.target.value !== "day" && e.target.value !== "year") {
      setSelectedDate(null);
    }
  };

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString || null);
  };

  return (
    <div className="p-6 mb-6 bg-white rounded-2xl border border-gray-300 relative">
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Biểu đồ đơn hàng & doanh thu</h2>
        <div className="flex items-center gap-4">
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
              format="DD-MM-YYYY"
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
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={orderAndRevenueData}>
          <defs>
            <linearGradient id="orderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f02f22" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#f02f22" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6278f5" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#6278f5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="order"
            stroke="#f52a2a"
            fill="url(#orderGradient)"
            name="Số đơn hàng"
            yAxisId="left"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6278f5"
            fill="url(#revenueGradient)"
            name="Doanh thu"
            yAxisId="right"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;