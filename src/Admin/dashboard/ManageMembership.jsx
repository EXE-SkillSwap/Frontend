import { AddMembershipDialog } from "@/Admin/dialog/AddMembershipDialog";
import { getMembershipsForAdmin } from "@/services/api/membershipService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  CreditCard,
  Edit,
  Trash2,
  Plus,
  Calendar,
  DollarSign,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const response = await getMembershipsForAdmin();

      if (response.status === 200) {
        setMemberships(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Không thể tải danh sách gói thành viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDuration = (duration) => {
    return `${duration} ngày`;
  };

  const handleEdit = (membership) => {
    console.log("Edit membership:", membership);
    // TODO: Implement edit functionality
  };

  const handleDelete = (membership) => {
    console.log("Delete membership:", membership);
    // TODO: Implement delete functionality
  };

  const getStatusBadge = (deleted) => {
    return deleted ? (
      <Badge variant="destructive">Đã xóa</Badge>
    ) : (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 border-green-200"
      >
        Hoạt động
      </Badge>
    );
  };

  const renderLoadingSkeleton = () =>
    [...Array(5)].map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </TableCell>
        <TableCell>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
        </TableCell>
        <TableCell>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
        </TableCell>
        <TableCell>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
        </TableCell>
        <TableCell>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-8"></div>
        </TableCell>
      </TableRow>
    ));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-8 h-8" />
            Quản lí gói thành viên
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý các gói thành viên và quyền lợi của người dùng
          </p>
        </div>
        <AddMembershipDialog onRefresh={fetchMemberships}>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm gói mới
          </Button>
        </AddMembershipDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng gói thành viên
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{memberships.length}</div>
            <p className="text-xs text-muted-foreground">
              Tất cả gói đang quản lý
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gói đang hoạt động
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberships.filter((m) => !m.deleted).length}
            </div>
            <p className="text-xs text-muted-foreground">Gói có thể sử dụng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gói đã xóa</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {memberships.filter((m) => m.deleted).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Gói không còn sử dụng
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Memberships Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Danh sách gói thành viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Tên gói</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Thời lượng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Cập nhật lần cuối</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  renderLoadingSkeleton()
                ) : memberships.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <CreditCard className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500">
                          Chưa có gói thành viên nào
                        </p>
                        <p className="text-sm text-gray-400">
                          Hãy thêm gói thành viên đầu tiên
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  memberships.map((membership) => (
                    <TableRow key={membership.id}>
                      <TableCell className="font-medium">
                        #{membership.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{membership.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">
                          {formatPrice(membership.price)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatDuration(membership.duration)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {moment(membership.createdAt).format("DD/MM/YYYY")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {moment(membership.createdAt).format("HH:mm")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {moment(membership.updatedAt).format("DD/MM/YYYY")}
                        </div>
                        <div className="text-xs text-gray-400">
                          {moment(membership.updatedAt).format("HH:mm")}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(membership.deleted)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(membership)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(membership)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
