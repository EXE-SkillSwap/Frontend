import { AddMembershipDialog } from "@/Admin/dialog/AddMembershipDialog";
import ConfirmDeleteMembership from "@/Admin/dialog/ConfirmDeleteMembership";
import UpdateMembershipDialog from "@/Admin/dialog/UpdateMembershipDialog";
import TableLoading from "@/components/common/loading/TableLoading";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginator from "@/generator/paginator";
import useDebounce from "@/hooks/use-debounce";
import { getMembershipsForAdmin } from "@/services/api/membershipService";
import { formatPrice } from "@/utils/course";
import {
  Calendar,
  CreditCard,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState("DESC");
  const [searchString, setSearchString] = useState("");
  const inputSearchDebounce = useDebounce(searchString, 300);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [updateMembershipDialogOpen, setUpdateMembershipDialogOpen] =
    useState(false);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const response = await getMembershipsForAdmin(
        currentPage,
        10,
        inputSearchDebounce,
        sortBy,
        isDeleted
      );

      if (response.status === 200) {
        setMemberships(response.data?.content);
        setTotalPages(response.data.page?.totalPages);
        setTotalElements(response.data.page?.totalElements);
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
  }, [currentPage, inputSearchDebounce, sortBy, isDeleted]);

  const formatDuration = (duration) => {
    return `${duration} ngày`;
  };

  const handleEdit = (membership) => {
    setSelectedMembership(membership);
    setUpdateMembershipDialogOpen(true);
  };

  const handleDelete = (membership) => {
    setSelectedMembership(membership);
    setConfirmDeleteDialogOpen(true);
  };

  const getStatusBadge = (deleted) => {
    return deleted ? (
      <Badge className={`bg-red-100 text-red-800 border-red-200`}>Đã xóa</Badge>
    ) : (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 border-green-200"
      >
        Hoạt động
      </Badge>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* filter */}
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Xắp sếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Xắp sếp</SelectLabel>
                <SelectItem value="DESC">Mới nhất</SelectItem>
                <SelectItem value="ASC">Cũ nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={isDeleted}
            onValueChange={(value) => setIsDeleted(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem value={false} className={`text-green-600`}>
                  Đang hoạt động
                </SelectItem>
                <SelectItem value={true} className={`text-red-600`}>
                  Đã xóa
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
                  <TableLoading />
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
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {confirmDeleteDialogOpen && (
        <ConfirmDeleteMembership
          open={confirmDeleteDialogOpen}
          onOpenChange={setConfirmDeleteDialogOpen}
          membership={selectedMembership}
          onRefresh={fetchMemberships}
        />
      )}
      {updateMembershipDialogOpen && (
        <UpdateMembershipDialog
          open={updateMembershipDialogOpen}
          onOpenChange={setUpdateMembershipDialogOpen}
          membership={selectedMembership}
          onRefresh={fetchMemberships}
        />
      )}
    </div>
  );
}
