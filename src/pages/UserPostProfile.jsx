import { getUserByNickname } from "@/services/api/userService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const UserPostProfile = () => {
  const { nickname } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});

  const fetchUserPosts = async () => {
    try {
      const response = await getUserByNickname(nickname);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [nickname]);

  const skillList = user?.skillTags?.split("#").filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col items-center py-10 px-2 mt-15">
      <Card className="max-w-xl w-full rounded-2xl shadow-lg p-0">
        <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-4">
          <Avatar className="w-32 h-32 border-4 border-purple-300">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold text-center">
            {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription className="text-gray-500 text-lg text-center">
            @{user.username}
          </CardDescription>
          <div className="mt-2 text-center text-gray-700">{user.bio}</div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <Badge variant="outline">
              <span className="font-semibold">Tuổi:</span> {user.age}
            </Badge>
            <Badge variant="outline">
              <span className="font-semibold">Giới tính:</span> {user.gender}
            </Badge>
            <Badge variant="outline">
              <span className="font-semibold">Địa chỉ:</span> {user.location}
            </Badge>
            <Badge variant="outline">
              <span className="font-semibold">Ngày sinh:</span> {user.birthday}
            </Badge>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-purple-700 text-center">
              Kỹ năng
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skillList?.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-semibold">Số điện thoại:</span>{" "}
              {user.phoneNumber}
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400">
            Tham gia từ:{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : ""}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPostProfile;
