import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import { Header } from "../components/dashboardChart/Header";
import { Sidebar } from "../components/dashboardChart/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex">
      <div className="flex-col h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-100 to-gray-100 overflow-y-auto h-screen">
        <div className="sticky top-0 z-20">
          <Header />
        </div>
        <main className={cn("flex-1 p-1")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
