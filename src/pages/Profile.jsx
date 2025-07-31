import { uploadImage } from "@/services/api/cloudinaryService";
import { getUserMembership } from "@/services/api/membershipService";
import {
  getProfileImageByUserId,
  getUserProfile,
  updateProfile,
} from "@/services/api/userService";
import ProfileMembershipCard from "@/components/cards/ProfileMembershipCard";
import ProfileSkillsCard from "@/components/cards/ProfileSkillsCard";
import UserSkillsCard from "@/components/cards/UserSkillsCard";
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
import UploadProfileImage from "@/components/UploadProfileImage";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Camera,
  Edit3Icon,
  GraduationCap,
  Mail,
  MapPin,
  Mars,
  Phone,
  Star,
  Venus,
} from "lucide-react";
import moment from "moment/moment";
import { useEffect, useRef, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import StoryDialog from "@/components/dialog/StoryDialog";

const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [userMembership, setUserMembership] = useState(null);
  const [userProfileImages, setUserProfileImages] = useState([]);
  const [openStoryDialog, setOpenStoryDialog] = useState(false);
  const nav = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  const fetchUserMembership = async () => {
    try {
      const response = await getUserMembership();
      setUserMembership(response.data);
    } catch (error) {
      console.error("Error fetching user membership:", error);
      // Handle error appropriately, e.g., show a toast notification
    }
  };

  const fetchUserProfileImage = async () => {
    const userId = userInfo?.id;
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await getProfileImageByUserId(userId);
      setUserProfileImages(response.data);
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchUserMembership();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    fetchUserProfileImage();
  }, [userInfo]);

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

  const handleOpenStory = () => {
    if (userProfileImages.length === 0) {
      return;
    }
    setOpenStoryDialog(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div className="min-h-screen bg-background mb-20">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-8 -translate-x-8"></div>

                <CardContent className="pt-8 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    {/* Enhanced Avatar Section */}
                    <div className="relative mb-6">
                      <label className="group relative cursor-pointer block">
                        {/* Outer gradient ring container */}
                        <div className="relative w-36 h-36 mx-auto">
                          {/* Gradient ring background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full p-1 shadow-lg">
                            {/* White inner ring */}
                            <div
                              onClick={handleOpenStory}
                              className="w-full h-full bg-white rounded-full p-1"
                            >
                              {/* Avatar */}
                              <Avatar className="w-full h-full shadow-2xl group-hover:scale-105 transition-all duration-300">
                                <AvatarImage
                                  src={userInfo?.avatarUrl}
                                  alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                                  className="object-cover w-full h-full rounded-full"
                                />
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold w-full h-full flex items-center justify-center">
                                  {userInfo?.firstName?.charAt(0)}
                                  {userInfo?.lastName?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                          {/* Status indicator */}
                          <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white rounded-full p-1.5 shadow-lg">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </label>
                    </div>

                    {openStoryDialog && (
                      <StoryDialog
                        open={openStoryDialog}
                        setOpen={setOpenStoryDialog}
                        images={userProfileImages}
                        user={userInfo}
                      />
                    )}

                    {/* Enhanced Name and Location */}
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                        {userInfo?.firstName} {userInfo?.lastName}
                      </h1>

                      {userInfo?.location && (
                        <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-full">
                            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="font-medium">
                              {userInfo?.location}
                            </span>
                          </div>
                        </div>
                      )}

                      <StoryDialog />

                      {/* Upload Button below name */}
                      <div className="flex justify-center mt-4">
                        <button
                          type="button"
                          onClick={() =>
                            !uploadLoading && fileInputRef.current?.click()
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-sm font-medium"
                          disabled={uploadLoading}
                        >
                          <Camera className="w-4 h-4" />
                          {uploadLoading ? "Đang tải..." : "Đổi ảnh đại diện"}
                        </button>
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
                    </div>
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {/* Enhanced Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="truncate font-medium text-slate-700">
                        {userInfo?.email}
                      </span>
                    </div>

                    {userInfo?.phoneNumber && (
                      <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <Phone className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium text-slate-700">
                          {userInfo?.phoneNumber}
                        </span>
                      </div>
                    )}

                    {userInfo?.profession && (
                      <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <Briefcase className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-slate-700">
                          {userInfo?.profession}
                        </span>
                      </div>
                    )}

                    {userInfo?.education && (
                      <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                          <GraduationCap className="h-4 w-4 text-indigo-600" />
                        </div>
                        <span className="font-medium text-slate-700">
                          {userInfo?.education}
                        </span>
                      </div>
                    )}

                    {userInfo?.gender && (
                      <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                        <div
                          className={`p-2 rounded-lg mr-3 ${
                            userInfo?.gender === "Nam"
                              ? "bg-blue-100"
                              : "bg-pink-100"
                          }`}
                        >
                          {userInfo?.gender === "Nam" ? (
                            <Mars className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Venus className="h-4 w-4 text-pink-600" />
                          )}
                        </div>
                        <span className="font-medium text-slate-700">
                          {userInfo?.gender}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center text-sm p-3 bg-slate-50/50 rounded-lg hover:bg-slate-100/50 transition-colors">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <Calendar className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-medium text-slate-700 mr-2">
                        Tham gia
                      </span>
                      <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 shadow-sm">
                        {moment(userInfo?.createdAt).format("MMMM YYYY")}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                  {/* Enhanced Action Buttons */}
                  <div className="space-y-4">
                    <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
                      <div className="bg-white rounded-md">
                        <UploadProfileImage />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
                        <div className="bg-white rounded-md">
                          <EditProfile
                            userInfo={userInfo}
                            onRefresh={fetchUserInfo}
                          />
                        </div>
                      </div>
                      <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
                        <div className="bg-white rounded-md">
                          <ChangePassword />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Membership Card */}
              <ProfileMembershipCard userMembership={userMembership} />

              {/* Skills Card */}
              <ProfileSkillsCard userInfo={userInfo} />
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/20 to-transparent rounded-full translate-y-6 -translate-x-6"></div>

                <CardHeader className="relative z-10 pb-4">
                  <CardTitle className="flex items-center text-xl font-bold">
                    <div className="p-2 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg mr-3 shadow-md">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Giới thiệu
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  {userInfo?.bio ? (
                    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200/50">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-blue-500" />
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-base font-medium flex-1">
                          {userInfo?.bio}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200/50">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Star className="h-8 w-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Chưa có giới thiệu
                        </h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                          Hãy thêm một đoạn giới thiệu về bản thân để mọi người
                          hiểu rõ hơn về bạn
                        </p>
                        <div className="mt-4">
                          <button
                            onClick={() => {
                              // Add logic to open edit profile modal
                              console.log("Open edit profile");
                            }}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            <Edit3Icon className="h-4 w-4 mr-2" />
                            Thêm giới thiệu
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* User Skills Card - moved to right column below Recent Activity */}
              <UserSkillsCard />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
