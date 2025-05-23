import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import DashboardTables from "./DashboardTables";
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
    <div className="dashboard-container page-transition">
      <DashboardStats filterType={filterType} selectedDate={selectedDate} />
      <DashboardChart
        filterType={filterType}
        setFilterType={setFilterType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <DashboardTables />
    </div>
  );
};

export default Dashboard;
