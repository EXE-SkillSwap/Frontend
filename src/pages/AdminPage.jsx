import { MetricsCards } from "@/Admin/components/MetricsCards";

const Admin = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Trang quản trị</h1>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />
    </div>
  );
};

export default Admin;
