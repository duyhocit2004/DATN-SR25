import { dispatchAction } from "@/store/actionHelper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Radio, RadioChangeEvent, Select } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Legend,
  Area,
} from "recharts";

const { Option } = Select;

const DashboardChart = () => {
  const dispatch = useAppDispatch();
  const { chartData, filterType } = useAppSelector((state) => state.dashboard);

  const handleFilterChange = (e: RadioChangeEvent) => {
    dispatch(dispatchAction("dashboard/setFilterType", e.target.value));
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Biểu đồ đơn hàng & doanh thu</h2>
        <Radio.Group value={filterType} onChange={handleFilterChange}>
          <Radio.Button value="month">Tháng</Radio.Button>
          <Radio.Button value="quarter">Quý</Radio.Button>
          <Radio.Button value="year">Năm</Radio.Button>
        </Radio.Group>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData[filterType]}>
          <defs>
            {/* Gradient cho số đơn hàng */}
            <linearGradient
              id="ordersGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3498db" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#3498db" stopOpacity={0} />
            </linearGradient>
            {/* Gradient cho doanh thu */}
            <linearGradient
              id="revenueGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e74c3c" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#e74c3c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Sử dụng gradient cho số đơn hàng */}
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#3498db"
            fill="url(#ordersGradient)"
            name="Số đơn hàng"
          />

          {/* Sử dụng gradient cho doanh thu */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#e74c3c"
            fill="url(#revenueGradient)"
            name="Doanh thu"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
