import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const ProfileSkillsCard = ({ userInfo }) => {
  const processSkills = (skills) => {
    if (!skills) return [];
    return skills
      .split("#")
      .filter((skill) => skill.trim())
      .map((skill) => skill.trim());
  };
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full translate-y-4 -translate-x-4"></div>

      {/* Left border accent */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500"></div>

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg mr-3 shadow-md">
            <Star className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sở Thích & Kỹ Năng
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        {processSkills(userInfo?.skillTags).length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {processSkills(userInfo?.skillTags).map((skill, index) => (
              <Badge
                key={index}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200/50 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200 font-medium px-3 py-1.5 shadow-sm"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200/50">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Chưa có kỹ năng nào được thêm
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hãy cập nhật hồ sơ để thêm kỹ năng của bạn
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSkillsCard;
