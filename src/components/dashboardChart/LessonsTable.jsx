import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const lessons = [
  {
    id: "1",
    name: "Git & GitHub",
    partner: "Tran Duy Khai",
    dateTime: "12.09.2023 - 12:53 PM",
    price: "$100",
    totalStudents: 401,
    status: "Available",
  },
  {
    id: "2",
    name: "React Fundamentals",
    partner: "Sarah Johnson",
    dateTime: "13.09.2023 - 10:00 AM",
    price: "$150",
    totalStudents: 289,
    status: "Available",
  },
  {
    id: "3",
    name: "TypeScript Basics",
    partner: "Michael Chen",
    dateTime: "14.09.2023 - 2:30 PM",
    price: "$120",
    totalStudents: 156,
    status: "Completed",
  },
  {
    id: "4",
    name: "Node.js Development",
    partner: "Emma Davis",
    dateTime: "15.09.2023 - 9:15 AM",
    price: "$180",
    totalStudents: 234,
    status: "Available",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Completed":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "Cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-green-100 text-green-800 hover:bg-green-100";
  }
};

export function LessonsTable() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Lessons
        </CardTitle>
        <Badge variant="outline" className="text-gray-600">
          October
        </Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="text-gray-600 font-medium">Name</TableHead>
              <TableHead className="text-gray-600 font-medium">Partner</TableHead>
              <TableHead className="text-gray-600 font-medium">Date - Time</TableHead>
              <TableHead className="text-gray-600 font-medium">Price</TableHead>
              <TableHead className="text-gray-600 font-medium">Total Student</TableHead>
              <TableHead className="text-gray-600 font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id} className="border-gray-100">
                <TableCell className="font-medium text-gray-900">
                  {lesson.name}
                </TableCell>
                <TableCell className="text-gray-600">
                  {lesson.partner}
                </TableCell>
                <TableCell className="text-gray-600">
                  {lesson.dateTime}
                </TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {lesson.price}
                </TableCell>
                <TableCell className="text-gray-900 font-medium">
                  {lesson.totalStudents}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lesson.status)}>
                    {lesson.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
