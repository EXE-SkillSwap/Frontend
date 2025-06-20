import { uploadImage } from "@/api/services/cloudinaryService";
import { getUserProfile, updateProfile } from "@/api/services/userService";
import ChangePassword from "@/components/ChangePassword";
import ChaseLoading from "@/components/common/loading/ChaseLoading";
import EditProfile from "@/components/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Calendar, Edit3Icon, Mail, MapPin, Phone, Star } from "lucide-react";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const processSkills = (skills) => {
    if (!skills) return [];
    return skills
      .split("#")
      .filter((skill) => skill.trim())
      .map((skill) => skill.trim());
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadLoading(true);
      toast.info("Đang tải ảnh lên...");
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "demo-upload-unsigned"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", cloudinary_name); // Cloudinary cloud name
    setUploadLoading(true);
    try {
      const response = await uploadImage(formData);
      if (response) {
        const newAvatarUrl = response.data?.secure_url;
        const body = {
          avatarUrl: newAvatarUrl,
        };
        const res = await updateProfile(body);
        if (res) {
          setUploadLoading(false);
          toast.success("Đổi ảnh đại diện thành công!");
          fetchUserInfo(); // Refresh user info after update
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Lỗi tải ảnh lên. Vui lòng thử lại.");
      setUploadLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-10">
            <ChaseLoading />
          </div>
          <p className="text-muted-foreground">Đang tải....</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="min-h-screen bg-background">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <label className="group relative cursor-pointer w-fit">
                      <Avatar className="h-32 w-32 border-4 border-background shadow-lg group-hover:opacity-80 transition">
                        <AvatarImage
                          src={userInfo?.avatarUrl}
                          alt={userInfo?.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">
                          {userInfo?.firstName?.charAt(0)}
                          {userInfo?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-full">
                        <span className="text-sm font-medium">
                          <Edit3Icon />
                        </span>
                      </div>

                      {/* Hidden file input */}
                      {!uploadLoading && (
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      )}
                    </label>
                    <h1 className="text-2xl font-bold mt-4">
                      {userInfo?.firstName} {userInfo?.lastName}
                    </h1>

                    {userInfo?.location && (
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {userInfo?.location}
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span className="truncate">{userInfo?.email}</span>
                    </div>
                    {userInfo?.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{userInfo?.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>
                        Tham gia{" "}
                        <Badge variant="secondary" className="">
                          {moment(userInfo?.createdAt).format("MMMM YYYY")}
                        </Badge>
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <EditProfile
                      userInfo={userInfo}
                      onRefresh={fetchUserInfo}
                    />
                    <ChangePassword />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Sở Thích - Kĩ Năng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {processSkills(userInfo?.skillTags).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Giới thiệu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {userInfo?.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Star className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">Profile Updated</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Successfully updated profile information
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
