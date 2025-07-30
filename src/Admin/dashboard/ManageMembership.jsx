import { AddMembershipDialog } from "@/Admin/dialog/AddMembershipDialog";
import { getMembershipsForAdmin } from "@/services/api/membershipService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

const columns = [
  { header: "ID", accessorKey: "id" },
  { header: "Tên", accessorKey: "name" },
  { header: "Giá", accessorKey: "price" },
  { header: "Thời lượng", accessorKey: "duration" },
  { header: "Ngày tạo", accessorKey: "createdAt" },
  { header: "Ngày cập nhật", accessorKey: "updatedAt" },
  {
    header: "Trạng thái",
    accessorKey: "deleted",
  },
  {
    header: "",
    accessorKey: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Cập nhật</DropdownMenuItem>
          <DropdownMenuItem className={"text-red-500"}>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function ManageMemberships() {
  const [memberships, setMemberships] = useState([]);

  const fetchMemberships = async () => {
    try {
      const response = await getMembershipsForAdmin();

      if (response.status === 200) {
        setMemberships(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="p-6 w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Quản lí gói thành viên</h1>
        <AddMembershipDialog onRefresh={fetchMemberships} />

        <p className="mb-4">
          Dưới đây là danh sách các gói thành viên hiện có. Bạn có thể quản lý
          chúng bằng cách sử dụng các hành động trong menu.
        </p>

        <Table>
          <TableCaption>Danh sách các gói thành viên.</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.accessorKey}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {memberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell className="font-medium">{membership.id}</TableCell>
                <TableCell>{membership.name}</TableCell>
                <TableCell>{membership.price}</TableCell>
                <TableCell>{membership.duration}</TableCell>
                <TableCell>
                  <Badge>
                    {moment(membership.createdAt).format("MM/DD/YYYY HH:mm:ss")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>
                    {moment(membership.updatedAt).format("MM/DD/YYYY HH:mm:ss")}
                  </Badge>
                </TableCell>

                <TableCell>
                  {membership.deleted ? (
                    <>
                      <Badge variant="" className="text-red-500">
                        Đã xóa
                      </Badge>
                    </>
                  ) : (
                    <>
                      <Badge variant="primary" className="text-green-500">
                        Đang hoạt động
                      </Badge>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {columns.find((col) => col.accessorKey === "actions").cell()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
