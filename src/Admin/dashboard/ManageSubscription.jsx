import TableLoading from "@/components/common/loading/TableLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
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
import { getAllSubscriptions } from "@/services/api/membershipSubscriptionService";
import { formatDate, formatPrice } from "@/utils/course";
import { CreditCard, Search, Timer, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("DESC");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchString, setSearchString] = useState("");
  const inputSearchDebounce = useDebounce(searchString, 300);

  // Mock data - replace with actual API call
  useEffect(() => {
    fetchSubscriptions();
  }, [currentPage, sort, statusFilter, paymentFilter, inputSearchDebounce]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getAllSubscriptions(
        currentPage,
        10,
        sort,
        statusFilter,
        paymentFilter,
        searchString
      );
      setSubscriptions(response.data?.content);
      setTotalElements(response.data?.page.totalElements);
      setTotalPages(response.data?.page.totalPages);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Không thể tải danh sách đăng ký");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: {
        variant: "secondary",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Chờ kích hoạt",
      },
      ACTIVE: {
        variant: "default",
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Đang hoạt động",
      },
      EXPIRED: {
        variant: "secondary",
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Đã hết hạn",
      },
      INACTIVE: {
        variant: "default",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Chưa kích hoạt",
      },
      CANCELLED: {
        variant: "destructive",
        className: "bg-gray-100 text-gray-800 border-gray-200",
        label: "Đã hủy",
      },
    };

    const config = variants[status] || variants.ACTIVE;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const variants = {
      COMPLETED: {
        className: "bg-green-100 text-green-800 border-green-200",
        label: "Đã thanh toán",
      },
      PENDING: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Chờ thanh toán",
      },
      FAILED: {
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Thanh toán thất bại",
      },
      CANCELLED: {
        className: "bg-red-100 text-red-800 border-red-200",
        label: "Đã hủy",
      },
    };

    const config = variants[paymentStatus] || variants.PENDING;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-8 h-8" />
            Quản lý đăng ký thành viên
          </h1>
          <p className="text-gray-600 mt-2">
            Theo dõi và quản lý các đăng ký gói thành viên của người dùng
          </p>
        </div>
      </div>
      {/* Filters */}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm theo mã đơn hàng..."
              className="pl-10"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Đang hoạt động</SelectItem>
            <SelectItem value="EXPIRED">Đã hết hạn</SelectItem>
            <SelectItem value="INACTIVE">Đã hủy</SelectItem>
            <SelectItem value="PENDING">Đang chờ</SelectItem>
            <SelectItem value="REMOVED">Đã xóa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc thanh toán" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPLETED">Đã thanh toán</SelectItem>
            <SelectItem value="PENDING">Chờ thanh toán</SelectItem>
            <SelectItem value="FAILED">Thất bại</SelectItem>
            <SelectItem value="PAID">Đã thanh toán</SelectItem>
            <SelectItem value="CANCELLED">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Danh sách đăng ký thành viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Gói thành viên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày kết thúc</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoading />
                ) : subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500">Chưa có đăng ký nào</p>
                        <p className="text-sm text-gray-400">
                          Đăng ký thành viên sẽ hiển thị ở đây
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={subscription.userDTO.avatarUrl}
                              alt={`${subscription.userDTO.firstName} ${subscription.userDTO.lastName}`}
                            />
                            <AvatarFallback>
                              {subscription.userDTO.firstName?.[0]}
                              {subscription.userDTO.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">
                              {subscription.userDTO.firstName}{" "}
                              {subscription.userDTO.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{subscription.userDTO.username}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {subscription.membership.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(subscription.membership.price)} -{" "}
                            {subscription.membership.duration} ngày
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(subscription.status)}
                          {subscription.status === "ACTIVE" && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              Còn {getDaysRemaining(subscription.endDate)} ngày
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          {formatDate(subscription.startDate)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          {formatDate(subscription.endDate)}
                        </div>
                      </TableCell>

                      <TableCell>
                        {getPaymentStatusBadge(subscription.paymentStatus)}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          #{subscription.orderCode}
                        </Badge>
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
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageSubscription;
