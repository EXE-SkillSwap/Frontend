import ConfirmRejectCourse from "@/Admin/dialog/ConfirmRejectCourse";
import CourseDetailDialog from "@/Admin/dialog/CourseDetailDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Paginator from "@/generator/paginator";
import useDebounce from "@/hooks/use-debounce";
import { approveCourse, getAllCourses } from "@/services/api/coursesService";
import { formatDate, formatPrice } from "@/utils/course";
import {
  ArrowUpDown,
  Check,
  ExternalLink,
  Filter,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("PENDING");
  const [sortBy, setSortBy] = useState("DESC");
  const [searchString, setSearchString] = useState("");
  const inputSearchDebounce = useDebounce(searchString, 300);
  const [courseDetailDialogOpen, setCourseDetailDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await getAllCourses(
        9,
        currentPage,
        inputSearchDebounce,
        status,
        sortBy
      );
      setCourses(response.data.content);
      setTotalPages(response.data.page?.totalPages);
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
  }, [currentPage, inputSearchDebounce, sortBy, status]);

  const handleApprove = async (courseId) => {
    try {
      const response = await approveCourse(courseId);
      if (response) {
        toast.success("Khóa học đã được duyệt thành công.");
        fetchCourses();
      }
    } catch (error) {
      console.error("Error approving course:", error);
      toast.error("Không thể duyệt khóa học");
    }
  };

  const handleReject = async (courseId) => {
    try {
      // TODO: Add API call for rejecting course
      console.log("Rejecting course:", courseId);
      toast.success("Đã từ chối khóa học");
      // Refresh the list
      fetchCourses();
    } catch (error) {
      console.error("Error rejecting course:", error);
      toast.error("Không thể từ chối khóa học");
    }
  };

  const handleConfirmReject = (course) => {
    setRejectDialogOpen(true);
    setSelectedCourse(course);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        variant: "outline",
        color: "text-yellow-600 border-yellow-600",
        text: "Chờ duyệt",
      },
      APPROVED: {
        variant: "outline",
        color: "text-green-600 border-green-600",
        text: "Đã duyệt",
      },
      REJECTED: {
        variant: "outline",
        color: "text-red-600 border-red-600",
        text: "Từ chối",
      },
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    return (
      <Badge variant={config.variant} className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(0); // Reset to first page when changing status
  };

  const handleSortChange = () => {
    setSortBy(sortBy === "DESC" ? "ASC" : "DESC");
  };

  const handleViewCourseDetail = (course) => {
    setSelectedCourse(course);
    setCourseDetailDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lí Khóa học</h1>
          <p className="text-gray-600 mt-1">
            Quản lí và kiểm duyệt các khóa học ({totalElements} khóa học)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên khóa học..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="PENDING">Chờ duyệt</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="REJECTED">Từ chối</option>
            </select>
          </div>

          {/* Sort */}
          <Button
            variant="outline"
            onClick={handleSortChange}
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Xếp theo đánh giá
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="flex-shrink-0 h-12 w-16"
                        onClick={() => handleViewCourseDetail(course)}
                      >
                        <img
                          className="h-12 w-16 rounded-md object-cover"
                          src={course.bannerUrl}
                          alt={course.courseName}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/64x48?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {course.courseName}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {course.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={course.user.avatarUrl}
                          alt={`${course.user.firstName} ${course.user.lastName}`}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/32x32?text=Avatar";
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {course.user.firstName} {course.user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{course.user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(course.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {course.rating || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(course.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(course.link, "_blank")}
                        title="Xem khóa học"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>

                      {course.status === "PENDING" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleApprove(course.id)}
                            title="Duyệt khóa học"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleConfirmReject(course)}
                            title="Từ chối khóa học"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <p className="text-lg font-medium">Không tìm thấy khóa học nào</p>
              <p className="text-sm">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {courseDetailDialogOpen && selectedCourse && (
        <CourseDetailDialog
          course={selectedCourse}
          isOpen={courseDetailDialogOpen}
          onClose={() => setCourseDetailDialogOpen(false)}
          onApprove={handleApprove}
        />
      )}
      {rejectDialogOpen && selectedCourse && (
        <ConfirmRejectCourse
          open={rejectDialogOpen}
          onOpenChange={setRejectDialogOpen}
          course={selectedCourse}
          onRefresh={fetchCourses}
        />
      )}
    </div>
  );
};

export default ManageCourses;
