import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { name: "5k", value: 20 },
  { name: "10k", value: 45 },
  { name: "15k", value: 40 },
  { name: "20k", value: 75 },
  { name: "25k", value: 65 },
  { name: "30k", value: 55 },
  { name: "35k", value: 70 },
  { name: "40k", value: 60 },
  { name: "45k", value: 80 },
  { name: "50k", value: 75 },
  { name: "55k", value: 65 },
  { name: "60k", value: 70 },
];

// Sửa lại phần này để dùng JavaScript, không dùng ": any"
const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{`${payload[0].value}%`}</p>
        <p className="text-xs opacity-90">{`+${label}`}</p>
      </div>
    );
  }
  return null;
};

export function MembershipChart() {
  return (
    <Card className="border-0 shadow-sm mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Membership Register
        </CardTitle>
        <Badge variant="outline" className="text-gray-600">
          October
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#3b82f6" }}
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
