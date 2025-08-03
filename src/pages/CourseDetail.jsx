import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseById } from "@/services/api/coursesService";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(courseId);
      setCourse(response.data);
    } catch (error) {
      toast.error("Không thể tải thông tin khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Đã duyệt
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Chờ duyệt
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleEnroll = () => {
    toast.success("Đăng ký khóa học thành công!");
  };

  const handleContact = () => {
    toast.info("Chức năng liên hệ đang được phát triển");
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Đã bỏ yêu thích" : "Đã thêm vào yêu thích");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không tìm thấy khóa học
          </h2>
          <p className="text-gray-600 mb-4">
            Khóa học này có thể đã bị xóa hoặc không tồn tại
          </p>
          <Button onClick={() => navigate("/courses")}>
            Quay về danh sách khóa học
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay về danh sách khóa học
          </Button>
        </div>

        {/* Hero Banner */}
        <div className="relative mb-8">
          <div className="h-64 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src={course.bannerUrl}
              alt={course.courseName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 left-4">
              {getStatusBadge(course.status)}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleFavorite}
                className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
              >
                <Share2 className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {course.courseName}
                  </h1>

                  <div className="flex items-center gap-4">
                    {course.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {course.rating}
                        </span>
                      </div>
                    )}
                    {/* <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>156 học viên</span>
                    </div> */}
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Tạo ngày {formatDate(course.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Description */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Về khóa học này
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Bạn sẽ học được gì
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Hỗ trợ từ giảng viên"].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="border-0 shadow-lg top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(course.price)}
                  </div>
                  <p className="text-sm text-gray-600">Một lần thanh toán</p>
                </div>

                <div className="space-y-4 mb-6">
                  <Button
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                    size="lg"
                  >
                    Đăng ký ngay
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open(course.link, "_blank")}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Xem thử
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Giảng viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={course.user.avatarUrl}
                      alt={course.user.firstName}
                    />
                    <AvatarFallback>
                      {course.user.firstName?.[0]}
                      {course.user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {course.user.firstName} {course.user.lastName}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      @{course.user.username}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={handleContact}
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Liên hệ giảng viên
                </Button>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Thống kê khóa học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-600">Học viên</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {course.rating}
                    </div>
                    <div className="text-sm text-gray-600">Đánh giá</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
