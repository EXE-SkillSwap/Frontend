import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCoursesByCurrentUser } from "@/services/api/coursesService";
import { ExternalLink, Plus, Star, Stars } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSkillsCard = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]); // Replace with actual skills data fetching logic
  const [loading, setLoading] = useState(true);
  const fetchUserCourses = async () => {
    setLoading(true);
    try {
      const response = await getCoursesByCurrentUser(5, 0);
      setSkills(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user courses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

  const processCourseStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Chờ duyệt";
      case "APPROVED":
        return "Đã duyệt";
      case "REJECTED":
        return "Đã từ chối";
      default:
        return "Không xác định";
    }
  };

  const processCourseStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg mr-3 shadow-md">
            <Star className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Khóa học và Kỹ năng
          </span>
          <Button
            variant="link"
            size="sm"
            className="ml-auto text-blue-600 hover:text-blue-700"
            onClick={() => navigate("/my-courses")}
          >
            Xem tất cả
          </Button>
        </CardTitle>
      </CardHeader>
      {skills.length === 0 ? (
        <CardContent className="relative z-10">
          <div className="flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-green-200/50">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Chưa có khoá học nào được thêm
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hãy thêm khoá học đầu tiên của bạn
              </p>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="relative z-10 space-y-4">
          <div className="space-y-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-green-200/50 hover:bg-white/80 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {skill.courseName}
                    </h4>
                    {skill.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                  {/* them status */}
                  <Badge className={processCourseStatusColor(skill.status)}>
                    {processCourseStatus(skill.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Stars className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {skill.rating ? skill.rating.toFixed(1) : "Chưa đánh giá"}
                  </span>
                  {skill.rating && (
                    <span className="text-yellow-500">
                      {"★".repeat(Math.floor(skill.rating))}
                      {"☆".repeat(5 - Math.floor(skill.rating))}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 border-0">
                      {skill.price?.toLocaleString("vi-VN")} VNĐ
                    </Badge>
                  </div>
                  {skill.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(skill.link, "_blank")}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Bằng chứng
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <div className="pt-2 px-6 pb-4">
        <Button
          onClick={() => navigate("/add-skill")}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm khóa học và kỹ năng mới
        </Button>
      </div>
    </Card>
  );
};

export default UserSkillsCard;
