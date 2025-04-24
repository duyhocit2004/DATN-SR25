import adminApi from "@/api/adminApi";
import { IDashboardChart } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Spin, DatePicker, Typography } from "antd";
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
const { RangePicker } = DatePicker;
const { Title } = Typography;

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

const getChartData = (data: IDashboardChart[]): IOrderAndRevenue[] => {
  return data.map((item) => ({
    name: item.stt,
    order: item.order,
    revenue: item.revenue,
  }));
};

const DashboardChart = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
}: DashboardChartProps) => {
  const [loading, setLoading] = useState(false);
  const [orderAndRevenueData, setOrderAndRevenueData] = useState<IOrderAndRevenue[]>([]);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    getData();
  }, [dateRange]);

  const getData = async () => {
    setLoading(true);
    try {
      const payload: { startDate?: string; endDate?: string } = {};
      
      if (dateRange) {
        payload.startDate = dateRange[0];
        payload.endDate = dateRange[1];
      }

      const response = await adminApi.getDashboardChart(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = getChartData(response.data);
        setOrderAndRevenueData(data);
        
        // Calculate totals
        const totalRev = data.reduce((sum, item) => sum + item.revenue, 0);
        const totalOrd = data.reduce((sum, item) => sum + item.order, 0);
        setTotalRevenue(totalRev);
        setTotalOrders(totalOrd);
      } else {
        setOrderAndRevenueData([]);
        setTotalRevenue(0);
        setTotalOrders(0);
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setOrderAndRevenueData([]);
      setTotalRevenue(0);
      setTotalOrders(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
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
          <RangePicker
            onChange={handleDateRangeChange}
            format="DD/MM/YYYY"
            placeholder={['Từ ngày', 'Đến ngày']}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Title level={5} className="text-gray-500">Tổng số đơn hàng</Title>
            <Title level={3} className="!mb-0">{totalOrders}</Title>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Title level={5} className="text-gray-500">Tổng doanh thu</Title>
            <Title level={3} className="!mb-0">{formatCurrency(totalRevenue)}</Title>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
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
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'Doanh thu') {
                return formatCurrency(value);
              }
              return value;
            }}
          />
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