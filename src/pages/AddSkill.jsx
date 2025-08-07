import NotMembershipDialog from "@/components/dialog/NotMembershipDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/services/api/cloudinaryService";
import { addCourses } from "@/services/api/coursesService";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  ImageIcon,
  Link as LinkIcon,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const cloudinary_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const AddSkill = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notMembsershipDialogOpen, setNotMembershipDialogOpen] =
    useState(false);

  // Single course state
  const [courseData, setCourseData] = useState({
    courseName: "",
    price: "",
    link: "",
    description: "",
    bannerFile: null,
    bannerPreview: "",
    achievements: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload for banner image
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Vui lòng chọn file ảnh hợp lệ (JPG, PNG, GIF, WebP)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Kích thước file không được vượt quá 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setCourseData((prev) => ({
      ...prev,
      bannerFile: file,
      bannerPreview: previewUrl,
    }));
  };

  // Remove banner image
  const removeBannerImage = () => {
    if (courseData.bannerPreview) {
      URL.revokeObjectURL(courseData.bannerPreview);
    }
    setCourseData((prev) => ({
      ...prev,
      bannerFile: null,
      bannerPreview: "",
    }));
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!courseData.courseName.trim()) {
      toast.error("Vui lòng nhập tên khóa học");
      return;
    }
    if (!courseData.price.trim()) {
      toast.error("Vui lòng nhập giá khóa học");
      return;
    }
    if (!courseData.link.trim()) {
      toast.error("Vui lòng nhập link bằng chứng");
      return;
    }
    if (!validateUrl(courseData.link)) {
      toast.error("Vui lòng nhập URL hợp lệ");
      return;
    }
    if (!courseData.description.trim()) {
      toast.error("Vui lòng nhập mô tả khóa học");
      return;
    }
    if (!courseData.achievements.trim()) {
      toast.error("Vui lòng nhập quyền lợi cho học viên");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", courseData.bannerFile);
      formData.append("upload_preset", "demo-upload-unsigned"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", cloudinary_name);
      const uploadBannerRes = await uploadImage(formData);
      if (uploadBannerRes) {
        const course = {
          courseName: courseData.courseName,
          price: parseFloat(courseData.price),
          link: courseData.link,
          description: courseData.description,
          achievements: courseData.achievements,
          bannerUrl: uploadBannerRes.data?.secure_url,
        };

        const response = await addCourses(course);
        console.log(response);
        toast.success("Thêm khóa học thành công!");
      }
      // Clean up preview URL
      if (courseData.bannerPreview) {
        URL.revokeObjectURL(courseData.bannerPreview);
      }

      navigate("/profile");
    } catch (error) {
      if (error.response?.data?.errorCode === 3003) {
        toast.info(error.response?.data?.message);
        setNotMembsershipDialogOpen(true);
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/profile")}
            className="mb-4 flex items-center gap-2 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Profile
          </Button>
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Thêm Khóa Học Mới
            </h1>
            <p className="text-gray-600">
              Chia sẻ kỹ năng của bạn với cộng đồng
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Thông Tin Khóa Học
              </CardTitle>
              <CardDescription className="text-gray-600">
                Điền đầy đủ thông tin để tạo khóa học của bạn
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Course Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseName"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Tên Khóa Học *
                    </Label>
                    <Input
                      id="courseName"
                      name="courseName"
                      type="text"
                      placeholder="Ví dụ: Lập trình React, Thiết kế UI/UX..."
                      value={courseData.courseName}
                      onChange={handleInputChange}
                      className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Course Price */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Giá Khóa Học (VNĐ) *
                    </Label>
                    <div className="relative">
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Ví dụ: 500000"
                        value={courseData.price}
                        onChange={handleInputChange}
                        className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        min="0"
                        required
                      />
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500">
                      Nhập giá khóa học mà bạn muốn dạy
                    </p>
                  </div>
                </div>

                {/* Evidence Link */}
                <div className="space-y-2">
                  <Label
                    htmlFor="link"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Link Bằng Chứng *
                  </Label>
                  <div className="relative">
                    <Input
                      id="link"
                      name="link"
                      type="url"
                      placeholder="https://example.com/certificate hoặc https://youtube.com/watch?v=..."
                      value={courseData.link}
                      onChange={handleInputChange}
                      className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Upload className="h-3 w-3" />
                    <span>Có thể là chứng chỉ, video demo, hoặc portfolio</span>
                  </div>
                  {courseData.link && !validateUrl(courseData.link) && (
                    <p className="text-xs text-red-500">
                      Vui lòng nhập URL hợp lệ
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Mô Tả Khóa Học *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Mô tả chi tiết về khóa học của bạn, nội dung sẽ được dạy, kinh nghiệm của bạn..."
                    value={courseData.description}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Mô tả chi tiết sẽ giúp học viên hiểu rõ hơn về khóa học
                  </p>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <Label
                    htmlFor="achievements"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Quyền Lợi Của Học Viên *
                  </Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    placeholder="Những gì học viên sẽ nhận được sau khi hoàn thành khóa học này..."
                    value={courseData.achievements}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Liệt kê các quyền lợi, kỹ năng mà học viên sẽ đạt được
                  </p>
                </div>

                {/* Banner Image Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bannerFile"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Hình Ảnh Banner (Tùy chọn)
                  </Label>

                  {/* Upload Area */}
                  <div className="space-y-4">
                    {!courseData.bannerPreview ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                        <input
                          id="bannerFile"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="bannerFile"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                        >
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                          <div className="text-center">
                            <span className="text-lg text-gray-600 font-medium">
                              Thêm ảnh banner cho khóa học
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              Nhấp để chọn ảnh hoặc kéo thả ảnh vào đây
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            PNG, JPG, GIF, WebP (tối đa 5MB)
                          </span>
                        </label>
                      </div>
                    ) : (
                      /* Image Preview */
                      <div className="relative">
                        <img
                          src={courseData.bannerPreview}
                          alt="Banner preview"
                          className="w-full h-64 object-cover rounded-lg border shadow-sm"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={removeBannerImage}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full"
                          title="Xóa ảnh"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          Banner khóa học
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    Hình ảnh banner sẽ giúp khóa học của bạn thu hút học viên
                    hơn
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Đang tạo khóa học...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Tạo khóa học
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {notMembsershipDialogOpen && (
        <NotMembershipDialog
          open={notMembsershipDialogOpen}
          onOpenChange={setNotMembershipDialogOpen}
        />
      )}
    </div>
  );
};

export default AddSkill;
