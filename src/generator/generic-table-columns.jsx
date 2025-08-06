import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Generic column creators
export const createTextColumn = (key, header, accessor) => ({
  accessorKey: key,
  header,
  cell: ({ row }) => {
    const value = accessor ? accessor(row.original) : row.getValue(key);
    return <div className="font-medium">{value}</div>;
  },
});

export const createBadgeColumn = (key, header, accessor, getBadgeVariant) => ({
  accessorKey: key,
  header,
  cell: ({ row }) => {
    const value = accessor ? accessor(row.original) : row.getValue(key);
    const variant = getBadgeVariant ? getBadgeVariant(value) : "default";
    return <Badge variant={variant}>{value}</Badge>;
  },
});

export const createAvatarColumn = (
  key,
  header,
  nameAccessor,
  avatarAccessor
) => ({
  accessorKey: key,
  header,
  cell: ({ row }) => {
    const name = nameAccessor(row.original);
    const avatarUrl = avatarAccessor(row.original);
    return (
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name?.[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{name}</span>
      </div>
    );
  },
});

export const createActionsColumn = (actions) => ({
  id: "actions",
  header: "Thao tác",
  cell: ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick(row.original)}
            className={action.className}
          >
            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
});

// Predefined table configurations
export const participantsTableColumns = [
  createAvatarColumn(
    "user",
    "Người tham gia",
    (row) => `${row.user?.firstName} ${row.user?.lastName}`,
    (row) => row.user?.avatarUrl
  ),
  createTextColumn("user.email", "Email", (row) => row.user?.email),
  createTextColumn("user.username", "Username", (row) => row.user?.username),
  createBadgeColumn("status", "Trạng thái", null, (status) =>
    status === "ACTIVE" ? "success" : "secondary"
  ),
  createTextColumn("joinedAt", "Ngày tham gia", (row) =>
    new Date(row.joinedAt).toLocaleDateString("vi-VN")
  ),
  createActionsColumn([
    {
      label: "Xem chi tiết",
      icon: Eye,
      onClick: (row) => console.log("View", row),
    },
    {
      label: "Chỉnh sửa",
      icon: Edit,
      onClick: (row) => console.log("Edit", row),
    },
    {
      label: "Xóa",
      icon: Trash2,
      onClick: (row) => console.log("Delete", row),
      className: "text-red-600",
    },
  ]),
];

export const coursesTableColumns = [
  createTextColumn("courseName", "Tên khóa học"),
  createAvatarColumn(
    "instructor",
    "Giảng viên",
    (row) => `${row.user?.firstName} ${row.user?.lastName}`,
    (row) => row.user?.avatarUrl
  ),
  createBadgeColumn("status", "Trạng thái", null, (status) => {
    const variants = {
      PENDING: "warning",
      APPROVED: "success",
      REJECTED: "destructive",
    };
    return variants[status] || "secondary";
  }),
  createTextColumn("price", "Giá", (row) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(row.price)
  ),
  createTextColumn("totalEnrollments", "Học viên"),
  createActionsColumn([
    {
      label: "Xem chi tiết",
      icon: Eye,
      onClick: (row) => console.log("View course", row),
    },
    {
      label: "Chỉnh sửa",
      icon: Edit,
      onClick: (row) => console.log("Edit course", row),
    },
  ]),
];

export const usersTableColumns = [
  createAvatarColumn(
    "user",
    "Người dùng",
    (row) => `${row.firstName} ${row.lastName}`,
    (row) => row.avatarUrl
  ),
  createTextColumn("email", "Email"),
  createTextColumn("username", "Username"),
  createBadgeColumn("role", "Vai trò", null, (role) =>
    role === "ADMIN" ? "destructive" : "default"
  ),
  createBadgeColumn("status", "Trạng thái", null, (status) =>
    status === "ACTIVE" ? "success" : "secondary"
  ),
  createActionsColumn([
    {
      label: "Xem hồ sơ",
      icon: Eye,
      onClick: (row) => console.log("View profile", row),
    },
    {
      label: "Chặn/Bỏ chặn",
      icon: Edit,
      onClick: (row) => console.log("Toggle status", row),
    },
  ]),
];
