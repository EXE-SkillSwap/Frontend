import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  formatDate,
  formatPrice,
  processCourseStatus,
  processCourseStatusColor,
} from "@/utils/course";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Star,
} from "lucide-react";

const MyCoursesItem = ({ course }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-3 h-3" />;
      case "APPROVED":
        return <BookOpen className="w-3 h-3" />;
      case "REJECTED":
        return <MoreHorizontal className="w-3 h-3" />;
      default:
        return <MoreHorizontal className="w-3 h-3" />;
    }
  };
  return (
    <Card className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm overflow-hidden">
      {/* Course Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.bannerUrl || "/placeholder-course.jpg"}
          alt={course.courseName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/placeholder-course.jpg";
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`${processCourseStatusColor(course.status)} border`}
          >
            {getStatusIcon(course.status)}
            <span className="ml-1">{processCourseStatus(course.status)}</span>
          </Badge>
        </div>
        {course.rating > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-white/90 text-gray-800 border-white/20">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              {course.rating}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {course.courseName}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          {/* Price */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">
              {formatPrice(course.price)}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Tạo ngày {formatDate(course.createdAt)}</span>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-2">
            <img
              src={course.user.avatarUrl || "/default-avatar.png"}
              alt={course.user.firstName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">
              {course.user.firstName} {course.user.lastName}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => window.open(course.link, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Xem chi tiết
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-green-50 hover:border-green-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            Quản lý
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MyCoursesItem;
