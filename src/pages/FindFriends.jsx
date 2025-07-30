import { getUserToFindFriends } from "@/services/api/userService";
import ChaseLoading from "@/components/common/loading/ChaseLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Heart, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";

const FindFriends = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLike = () => {
    console.log(`Liked ${users[currentIndex]?.name}`);
    nextUser();
  };

  const handlePass = () => {
    console.log(`Passed ${users[currentIndex]?.name}`);
    nextUser();
  };

  const nextUser = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset to beginning or show "no more users" message
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await getUserToFindFriends(currentPage - 1, 10); // Fetch first page with 10 users
      setUsers(response.data?.content);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  const currentUser = users[currentIndex];

  const processSkills = (skills) => {
    if (!skills) return [];
    return skills
      .split("#")
      .filter((skill) => skill.trim())
      .map((skill) => skill.trim());
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Không có người dùng nào để hiển thị
          </h2>
          <p className="text-gray-600">
            Hãy quay lại sau hoặc mời bạn bè tham gia để có thêm người dùng mới!
          </p>
          <div className="flex justify-center mt-10">
            <ChaseLoading />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Tìm Bạn Mới
        </h1>

        {/* User Card */}
        <Card className="relative overflow-hidden shadow-2xl border-0 bg-white">
          <div className="relative">
            <img
              src={currentUser.avatarUrl || "/placeholder.svg"}
              alt={currentUser.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* User Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <span className="text-xl">{currentUser.age}</span>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{currentUser.location}</span>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            {/* Bio */}
            <p className="text-gray-700 mb-4 leading-relaxed">
              {currentUser.bio}
            </p>

            {/* Professional Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{currentUser.profession}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">{currentUser.education}</span>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Sở thích - Kỹ năng
              </h3>
              <div className="flex flex-wrap gap-2">
                {processSkills(currentUser?.skillTags).map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={handlePass}
                size="lg"
                variant="outline"
                className="rounded-full w-16 h-16 p-0 border-2 border-gray-300 hover:border-red-400 hover:bg-red-50"
              >
                <X className="h-6 w-6 text-gray-600 hover:text-red-500" />
              </Button>

              <Button
                onClick={handleLike}
                size="lg"
                className="rounded-full w-16 h-16 p-0 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
              >
                <Heart className="h-6 w-6 text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindFriends;
