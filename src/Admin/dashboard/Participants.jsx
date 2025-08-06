import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { getAllUsers } from "@/services/api/userService";
import { formatDateVN } from "@/utils/format";
import {
  ArrowUpDown,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";

const Participants = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [role, setRole] = useState("USER");
  const [sortBy, setSortBy] = useState("DESC");
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const inputSearchDebounce = useDebounce(searchString, 300);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(
        currentPage,
        15,
        inputSearchDebounce,
        role,
        sortBy
      );
      setUsers(response.data.content);
      setTotalPages(response.data.page?.totalPages);
      setTotalElements(response.data.page?.totalElements);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, inputSearchDebounce, sortBy]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewUser = (user) => {
    console.log("View user:", user);
    // Navigate to user detail page
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
    // Open edit user dialog
  };

  const handleBlockUser = (user) => {
    console.log("Block user:", user);
    // Handle block/unblock user
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lí Người dùng
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lí và kiểm duyệt các người dùng ({totalElements} người dùng)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên người dùng..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sort */}
          <Button
            variant="outline"
            onClick={() => setSortBy(sortBy === "ASC" ? "DESC" : "ASC")}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Xếp theo {sortBy === "ASC" ? "A-Z" : "Z-A"}
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Tuổi</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-8 bg-gray-200 rounded w-8 animate-pulse ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500">
                      Không tìm thấy người dùng nào
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={user.avatarUrl}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback>
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={"primary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {user.age || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDateVN(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBlockUser(user)}
                          className="text-red-600"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Chặn người dùng
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

      {/* Pagination */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Participants;
