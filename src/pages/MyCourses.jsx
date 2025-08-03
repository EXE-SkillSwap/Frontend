import CoursesLoading from "@/components/common/loading/CoursesLoading";
import MyCoursesItem from "@/components/items/MyCoursesItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCoursesByCurrentUser } from "@/services/api/coursesService";
import { processCourseStatus } from "@/utils/course";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const fetchCourses = async (page = currentPage) => {
    try {
      setLoading(true);
      const response = await getCoursesByCurrentUser(9, page);
      setCourses(response.data.content);
      setTotalPages(response.data?.page?.totalPages);
      setCurrentPage(response.data?.page?.number);
      setTotalElements(response.data?.page?.totalElements);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Không thể tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      fetchCourses(newPage);
    }
  };

  const filteredCourses =
    statusFilter === "ALL"
      ? courses
      : courses.filter((course) => course.status === statusFilter);

  if (loading) {
    return <CoursesLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl" />
        <motion.div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Khóa Học Của Tôi
              </h1>
              <p className="text-gray-600">
                Quản lý và theo dõi tất cả các khóa học bạn đã tạo
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BookOpen className="w-4 h-4" />
                <span>{totalElements} khóa học tổng cộng</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/add-skill")}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <Plus className="w-4 h-4" />
                Thêm khóa học
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Tổng khóa học",
              value: totalElements,
              icon: BookOpen,
              color: "blue",
            },
            {
              title: "Chờ duyệt",
              value: courses.filter((c) => c.status === "PENDING").length,
              icon: Clock,
              color: "yellow",
            },
            {
              title: "Đã duyệt",
              value: courses.filter((c) => c.status === "APPROVED").length,
              icon: BookOpen,
              color: "green",
            },
            {
              title: "Đánh giá TB",
              value: (
                courses.reduce((acc, c) => acc + c.rating, 0) /
                  courses.length || 0
              ).toFixed(1),
              icon: Star,
              color: "purple",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filter Section */}
        <motion.div className="mb-6">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Lọc theo trạng thái:
                </span>
                <div className="flex gap-2">
                  {[
                    { value: "ALL", label: "Tất cả" },
                    { value: "PENDING", label: "Chờ duyệt" },
                    { value: "APPROVED", label: "Đã duyệt" },
                    { value: "REJECTED", label: "Đã từ chối" },
                  ].map((filter) => (
                    <Button
                      key={filter.value}
                      variant={
                        statusFilter === filter.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter(filter.value)}
                      className={`transition-all duration-200 ${
                        statusFilter === filter.value
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence>
          {filteredCourses.length > 0 ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <MyCoursesItem course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {statusFilter === "ALL"
                  ? "Chưa có khóa học nào"
                  : `Không có khóa học ${processCourseStatus(
                      statusFilter
                    ).toLowerCase()}`}
              </h3>
              <p className="text-gray-600 mb-6">
                {statusFilter === "ALL"
                  ? "Hãy tạo khóa học đầu tiên của bạn để bắt đầu chia sẻ kiến thức"
                  : "Thử thay đổi bộ lọc để xem các khóa học khác"}
              </p>
              {statusFilter === "ALL" && (
                <Button
                  onClick={() => navigate("/add-skill")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo khóa học đầu tiên
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Hiển thị</span>
                    <span className="font-medium">
                      {currentPage * 10 + 1} -{" "}
                      {Math.min((currentPage + 1) * 10, totalElements)}
                    </span>
                    <span>trong tổng số</span>
                    <span className="font-medium">{totalElements}</span>
                    <span>khóa học</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Trước
                    </Button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, index) => (
                        <Button
                          key={index}
                          variant={
                            currentPage === index ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(index)}
                          className={`w-8 h-8 p-0 ${
                            currentPage === index
                              ? "bg-blue-500 text-white"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages - 1}
                      className="flex items-center gap-1"
                    >
                      Sau
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyCourses;
