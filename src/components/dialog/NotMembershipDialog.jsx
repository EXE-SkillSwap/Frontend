import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ArrowRight, Crown, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotMembershipDialog = ({ open, onOpenChange }) => {
  const nav = useNavigate();

  const handleUpgrade = () => {
    nav("/membership");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-0 shadow-2xl">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
            >
              <Crown className="h-8 w-8 text-yellow-300" />
            </motion.div>

            <DialogHeader className="text-center">
              <DialogTitle className="text-3xl font-bold text-white mb-2">
                Nâng cấp thành viên
              </DialogTitle>
              <DialogDescription className="text-blue-100 text-lg">
                Mở khóa tất cả tính năng cao cấp và bắt đầu hành trình phát
                triển kỹ năng
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">
                  Cần gói thành viên để tiếp tục
                </h3>
                <p className="text-amber-700 text-sm">
                  Bạn cần nâng cấp gói thành viên để có thể thêm kỹ năng mới và
                  truy cập đầy đủ các tính năng của nền tảng.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Để sau
            </Button>
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
            >
              <span>Nâng cấp ngay</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotMembershipDialog;
