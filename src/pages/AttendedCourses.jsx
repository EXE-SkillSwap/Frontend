import MyCoursesItem from "@/components/items/MyCoursesItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useDebounce from "@/hooks/use-debounce";
import { getAttendedCourses } from "@/services/api/coursesService";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AttendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("DESC");
  const [searchString, setSearchString] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const inputSearchDebounce = useDebounce(searchString, 300);

  const fetchCourses = async () => {
    try {
      const response = await getAttendedCourses(9, currentPage);
      setCourses(response.data.content);
      setTotalPages(response.data.page?.totalPages);
      setCurrentPage(response.data.page?.number);
      setTotalElements(response.data.page?.totalElements);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Không thể tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentPage, inputSearchDebounce, sortBy]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <motion.div initial="hidden" animate="visible" className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm khóa học..."
                onChange={(e) => setSearchString(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Separator orientation="vertical" className="h-6" />

              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="w-8 h-8 p-0"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="w-8 h-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-6"
        >
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{courses.length}</span> trong
            tổng số <span className="font-medium">{totalElements}</span> khóa
            học
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setSortBy(sortBy === "ASC" ? "DESC" : "ASC")}
          >
            {sortBy === "ASC" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
            Sắp xếp theo đánh giá
          </Button>
        </motion.div>

        {/* Courses Grid/List */}
        {courses.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                : "space-y-4 mb-8"
            }
          >
            {courses.map((course) => (
              <MyCoursesItem key={course.id} course={course} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Không tìm thấy khóa học nào
            </h3>
            <p className="text-gray-600 mb-6">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm khóa học
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial="hidden" animate="visible">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Trang {currentPage + 1} trong tổng số {totalPages} trang
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
                      {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                        const pageIndex =
                          Math.max(
                            0,
                            Math.min(currentPage - 2, totalPages - 5)
                          ) + index;
                        return (
                          <Button
                            key={pageIndex}
                            variant={
                              currentPage === pageIndex ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageIndex)}
                            className={`w-8 h-8 p-0 ${
                              currentPage === pageIndex
                                ? "bg-purple-500 text-white"
                                : "hover:bg-blue-50"
                            }`}
                          >
                            {pageIndex + 1}
                          </Button>
                        );
                      })}
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
      </div>
    </div>
  );
};

export default AttendedCourses;
