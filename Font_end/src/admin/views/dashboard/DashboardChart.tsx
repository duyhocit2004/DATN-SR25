import adminApi from "@/api/adminApi";
import { IDashboardChart } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Radio, RadioChangeEvent, Spin } from "antd";
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
interface IOrderAndRevenue {
  name: string;
  order: number;
  revenue: number;
}

enum FilterType {
  Month = "month",
  Quarter = "quarter",
  Year = "year",
}

const fakeQuarterData = [
  {
    stt: 1,
    order: 100,
    revenue: 700000000,
  },
  {
    stt: 2,
    order: 200,
    revenue: 10000000000,
  },
  {
    stt: 3,
    order: 300,
    revenue: 500000000,
  },
];
const fakeMonthData = [
  {
    stt: 1,
    order: 100,
    revenue: 700000000,
  },
  {
    stt: 2,
    order: 200,
    revenue: 1000000000,
  },
  {
    stt: 3,
    order: 300,
    revenue: 500000000,
  },
  {
    stt: 4,
    order: 300,
    revenue: 100000000,
  },
];
const fakeYearData = [
  {
    stt: 1,
    order: 100,
    revenue: 700000000,
  },
  {
    stt: 2,
    order: 200,
    revenue: 500000000,
  },
  {
    stt: 3,
    order: 300,
    revenue: 1000000000,
  },
  {
    stt: 4,
    order: 300,
    revenue: 100000000,
  },
];

const defaultData = (filterType: FilterType) => {
  switch (filterType) {
    case FilterType.Month:
      return fakeMonthData;
    case FilterType.Quarter:
      return fakeQuarterData;
    case FilterType.Year:
      return fakeYearData;
  }
};
const getChartData = (
  filterType: FilterType,
  data: IDashboardChart[]
): IOrderAndRevenue[] => {
  let name = "";
  switch (filterType) {
    case FilterType.Month:
      name = `Tuần`;
      break;
    case FilterType.Quarter:
      name = `Tháng`;
      break;
    case FilterType.Year:
      name = `Quý`;
      break;
  }
  return data.map((item) => {
    return {
      name: name + " " + item.stt,
      order: item.order,
      revenue: item.revenue,
    };
  });
};
const DashboardChart = () => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.Month);
  const [loading, setLoading] = useState(false);
  const [orderAndRevenueData, setOrderAndRevenueData] = useState<
    IOrderAndRevenue[]
  >([]);

  useEffect(() => {
    getData();
  }, [filterType]);

  const getData = async () => {
    setLoading(true);
    try {
      const payload = {
        time: filterType,
      };
      const response = await adminApi.getDashboardChart(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        const data = getChartData(filterType, response.data);
        setOrderAndRevenueData(data);
      } else {
        setOrderAndRevenueData([]);
      }
    } finally {
      // const fakeArr = defaultData(filterType);
      // const data = getChartData(filterType, fakeArr);
      // setOrderAndRevenueData(data);
      setLoading(false);
    }
  };

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilterType(e.target.value);
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
        <Radio.Group value={filterType} onChange={handleFilterChange}>
          <Radio.Button value="month">Tháng</Radio.Button>
          <Radio.Button value="quarter">Quý</Radio.Button>
          <Radio.Button value="year">Năm</Radio.Button>
        </Radio.Group>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={orderAndRevenueData}>
          <defs>
            {/* Gradient cho số đơn hàng */}
            <linearGradient
              id="ordersGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f02f22" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#f02f22" stopOpacity={0} />
            </linearGradient>
            {/* Gradient cho doanh thu */}
            <linearGradient
              id="revenueGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6278f5" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#6278f5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          {/* Trục y phải cho doanh thu */}
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />

          {/* Số đơn hàng - Trục y trái */}
          <Area
            type="monotone"
            dataKey="order"
            stroke="#f52a2a"
            fill="url(#ordersGradient)"
            name="Số đơn hàng"
            yAxisId="left"
          />

          {/* Doanh thu - Trục y phải */}
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
