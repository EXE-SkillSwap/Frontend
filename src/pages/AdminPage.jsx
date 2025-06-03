import { DashboardLayout } from "@/Admin/dashboard/DashboardLayout";
import { MetricsCards } from "@/components/dashboardChart/MetricsCards";
import { MembershipChart } from "@/components/dashboardChart/MembershipChart";
import { LessonsTable } from "@/components/dashboardChart/LessonsTable";

const Admin = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Metrics Cards */}
        <MetricsCards />

        {/* Membership Chart */}
        <MembershipChart />

        {/* Lessons Table */}
        <LessonsTable />
      </div>
    </DashboardLayout>
  );
};

export default Admin;
