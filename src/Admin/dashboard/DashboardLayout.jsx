import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import { Sidebar } from "../../components/dashboardChart/Sidebar";
import { Header } from "../../components/dashboardChart/Header";

export function DashboardLayout({ children, className }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className={cn("flex-1 p-6", className)}>{children}</main>
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
