import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";
import { useState } from "react";

enum FilterType {
  Day = "day",
  Week = "week",
  Month = "month",
  Quarter = "quarter",
  Year = "year",
}
const Dashboard = () => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.Year);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  return (
    <div className="dashboard-container">
      <DashboardStats filterType={filterType} selectedDate={selectedDate} />
      <DashboardChart
        filterType={filterType}
        setFilterType={setFilterType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
