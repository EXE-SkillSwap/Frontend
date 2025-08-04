import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { rejectCourse } from "@/services/api/coursesService";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ConfirmRejectCourse = ({ open, onOpenChange, course, onRefresh }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!reason.trim()) {
      setError("Vui lòng cung cấp lý do từ chối khóa học.");
      return;
    }
    try {
      const body = {
        courseId: course.id,
        reason: reason.trim(),
      };
      const response = await rejectCourse(body);
      if (response) {
        toast.success("Khóa học đã được từ chối thành công.");
        onRefresh();
        handleClose();
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi từ chối khóa học. Vui lòng thử lại sau.");
    }
  };

  const handleClose = () => {
    setReason("");
    setError("");
    onOpenChange(false);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (error) setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Từ chối khóa học
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn từ chối <strong>{course.courseName}</strong>?
            Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">Lý do từ chối *</Label>
            <Textarea
              id="reason"
              placeholder="Vui lòng cung cấp lý do từ chối khóa học này..."
              value={reason}
              onChange={handleReasonChange}
              className={error ? "border-destructive" : ""}
              rows={4}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Từ chối khóa học
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmRejectCourse;
