import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteMembership } from "@/services/api/membershipService";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ConfirmDeleteMembership = ({
  open,
  onOpenChange,
  membership,
  onRefresh,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await deleteMembership(membership.id);

      if (response.status === 200) {
        toast.success("Xóa gói thành viên thành công!");
        onRefresh();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error deleting membership:", error);
      toast.error("Có lỗi xảy ra khi xóa gói thành viên. Vui lòng thử lại!");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  if (!membership) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Xác nhận xóa gói thành viên
          </DialogTitle>
          <DialogDescription className="text-left">
            Bạn có chắc chắn muốn xóa gói thành viên{" "}
            <strong className="text-gray-900">"{membership.name}"</strong>{" "}
            không?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Cảnh báo:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Hành động này không thể hoàn tác</li>
                  <li>• Gói thành viên sẽ bị xóa vĩnh viễn khỏi hệ thống</li>
                  <li>• Người dùng hiện tại sẽ không thể gia hạn gói này</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Membership info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">Thông tin gói:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tên gói:</span>
                <span className="font-medium">{membership.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Giá:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(membership.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Thời lượng:</span>
                <span className="font-medium">{membership.duration} ngày</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isDeleting}>
            Hủy bỏ
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đang xóa...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Xóa gói thành viên
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteMembership;
