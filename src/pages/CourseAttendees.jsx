import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Paginator from "@/generator/paginator";
import { sendMessage } from "@/services/api/conversationsService";
import { getCourseAttendees } from "@/services/api/coursesService";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Mail,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseAttendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const response = await getCourseAttendees(courseId, 10, page);
      setAttendees(response.data?.content || []);
      setTotalPages(response.data?.page?.totalPages || 0);
      setTotalElements(response.data?.page?.totalElements || 0);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      setAttendees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchAttendees();
    }
  }, [courseId, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Filter attendees based on search term
  const filteredAttendees = attendees.filter(
    (attendee) =>
      `${attendee.firstName} ${attendee.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      attendee.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContact = async (userId) => {
    try {
      const response = await sendMessage(userId);
      if (response) {
        navigate(`/chats?cId=${response.data?.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Chưa có học viên nào
      </h3>
      <p className="text-gray-500 mb-4">
        Khóa học này chưa có học viên đăng ký tham gia.
      </p>
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Quay lại
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                Danh sách học viên
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý và theo dõi học viên tham gia khóa học
              </p>
            </div>

            {/* Stats Card */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalElements}
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <UserCheck className="w-4 h-4" />
                  Học viên
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Học viên tham gia ({filteredAttendees.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                renderLoadingSkeleton()
              ) : filteredAttendees.length === 0 ? (
                renderEmptyState()
              ) : (
                <>
                  {/* Attendees Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {filteredAttendees.map((attendee, index) => (
                      <motion.div>
                        <Card className="hover:shadow-lg transition-all duration-300  cursor-pointer border-0 bg-gradient-to-br from-white to-blue-50/30">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              {/* Avatar */}
                              <div className="relative">
                                <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                                  <AvatarImage
                                    src={attendee.avatarUrl}
                                    alt={`${attendee.firstName} ${attendee.lastName}`}
                                  />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                                    {attendee.firstName?.charAt(0)}
                                    {attendee.lastName?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>

                                {/* Online indicator */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                              </div>

                              {/* User Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-lg truncate">
                                  {attendee.firstName} {attendee.lastName}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                                  <User className="w-3 h-3" />@
                                  {attendee.username}
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  handleContact(attendee.id);
                                }}
                              >
                                <Mail className="w-3 h-3 mr-1" />
                                Nhắn tin
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Paginator
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseAttendees;
