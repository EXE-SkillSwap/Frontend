import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Phone } from "lucide-react";

const ConfirmEnrollCourseDialog = ({
  isOpen,
  onClose,
  onConfirm,
  courseName,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            Xác nhận tham gia khóa học
          </DialogTitle>
          <DialogDescription className="text-left">
            Bạn có chắc chắn muốn tham gia khóa học{" "}
            <strong>{courseName}</strong> không?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Lưu ý quan trọng:</p>
              <p>
                Hãy liên hệ với người hướng dẫn và thanh toán học phí với họ để
                hoàn tất quá trình đăng ký.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            className={`bg-purple-500 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
          >
            Xác nhận tham gia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEnrollCourseDialog;
