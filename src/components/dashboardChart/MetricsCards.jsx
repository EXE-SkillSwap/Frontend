import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Folder, DollarSign, Clock } from "lucide-react";

const metrics = [
  {
    title: "Tổng số người dùng",
    value: "4,689",
    icon: Users,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
  {
    title: "Tổng số danh mục",
    value: "293",
    icon: Folder,
    iconColor: "text-yellow-600",
    iconBgColor: "bg-yellow-100",
  },
  {
    title: "Tổng doanh thu",
    value: "$9,000",
    icon: DollarSign,
    iconColor: "text-green-600",
    iconBgColor: "bg-green-100",
  },
  {
    title: "Tổng đang chờ",
    value: "40",
    icon: Clock,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, iconColor, iconBgColor }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconBgColor: PropTypes.string.isRequired,
};
