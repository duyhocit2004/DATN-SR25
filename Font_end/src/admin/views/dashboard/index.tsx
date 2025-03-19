import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardStats />
      <DashboardChart />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
