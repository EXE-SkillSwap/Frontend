import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatPrice } from "@/utils/course";
import {
  Calendar,
  Check,
  Clock,
  Copy,
  DollarSign,
  ExternalLink,
  Star,
  User,
} from "lucide-react";
import { toast } from "sonner";

const CourseDetailDialog = ({ course, isOpen, onClose, onApprove }) => {
  if (!course) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        variant: "outline",
        color: "text-yellow-600 border-yellow-600 bg-yellow-50",
        text: "Chờ duyệt",
      },
      APPROVED: {
        variant: "outline",
        color: "text-green-600 border-green-600 bg-green-50",
        text: "Đã duyệt",
      },
      REJECTED: {
        variant: "outline",
        color: "text-red-600 border-red-600 bg-red-50",
        text: "Từ chối",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <Badge variant={config.variant} className={`${config.color} px-3 py-1`}>
        {config.text}
      </Badge>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã sao chép vào clipboard");
  };

  const handleApprove = () => {
    onApprove(course.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-12/15 max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Chi tiết khóa học
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Banner */}
          <div className="relative">
            <img
              src={course.bannerUrl}
              alt={course.courseName}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=No+Image";
              }}
            />
            <div className="absolute top-4 right-4">
              {getStatusBadge(course.status)}
            </div>
          </div>

          {/* Course Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Title and Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {course.courseName}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Thông tin khóa học
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Giá khóa học</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(course.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-500">Đánh giá</p>
                      <p className="font-medium text-gray-900">
                        {course.rating || 0} / 5
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Ngày tạo</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(course.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">ID khóa học</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          #{course.id}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(course.id.toString())}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-blue-600" />
                  Link khóa học
                </h4>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border text-sm text-gray-700 break-all">
                    {course.link}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(course.link)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(course.link, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  Tác giả
                </h4>
                <div className="flex items-center gap-3">
                  <img
                    src={course.user.avatarUrl}
                    alt={`${course.user.firstName} ${course.user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/48x48?text=Avatar";
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {course.user.firstName} {course.user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      @{course.user.username}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-gray-400">ID:</span>
                      <span className="text-xs text-gray-600">
                        #{course.user.id}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(course.user.id.toString())
                        }
                        className="h-4 w-4 p-0 ml-1"
                      >
                        <Copy className="h-2 w-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Thống kê nhanh
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    {getStatusBadge(course.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Giá:</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Đánh giá:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-gray-900">
                        {course.rating || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {course.status === "PENDING" && (
                <div className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Duyệt khóa học
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
