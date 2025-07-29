import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, DollarSign, Plus, Star, Edit, Trash2 } from "lucide-react";
import { getUserSkills, deleteUserSkill } from "@/api/services/skillService";
import { toast } from "sonner";
import { UserSkillsContext } from "@/pages/Profile";

const UserSkillsCard = () => {
  const navigate = useNavigate();
  const { skills } = useContext(UserSkillsContext);
  const [loading, setLoading] = useState(true);

  const fetchUserSkills = async () => {
    try {
      setLoading(true);
      const response = await getUserSkills();
      if (response && response.data) {
        setUserSkills(response.data);
      }
    } catch (error) {
      console.error("Error fetching user skills:", error);
      // Don't show error toast for initial load
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa kỹ năng này?")) {
      return;
    }

    try {
      await deleteUserSkill(skillId);
      toast.success("Xóa kỹ năng thành công!");
      fetchUserSkills(); // Refresh the list
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Có lỗi xảy ra khi xóa kỹ năng");
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, []);

  if (skills.length === 0) {
    return (
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="flex items-center text-lg font-bold">
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg mr-3 shadow-md">
              <Star className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Kỹ Năng Của Tôi
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-green-200/50">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Chưa có kỹ năng nào được thêm
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hãy thêm kỹ năng đầu tiên của bạn
              </p>
            </div>
          </div>
        </CardContent>
        <div className="pt-2 px-6 pb-4">
          <Button
            onClick={() => window.location.href = "/add-skill"}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm kỹ năng mới
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-green-200/20 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-full translate-y-4 -translate-x-4"></div>

      {/* Left border accent */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-400 via-emerald-500 to-teal-500"></div>

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg mr-3 shadow-md">
            <Star className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Kỹ Năng Của Tôi
          </span>
        </CardTitle>
      </CardHeader>

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
                    {skill.skillName}
                  </h4>
                  {skill.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {skill.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 border-0">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {skill.coursePrice?.toLocaleString('vi-VN')} VNĐ
                  </Badge>
                </div>
                {skill.evidenceLink && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(skill.evidenceLink, '_blank')}
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
        <div className="pt-2">
          <Button
            onClick={() => window.location.href = "/add-skill"}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2.5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm kỹ năng mới
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSkillsCard;