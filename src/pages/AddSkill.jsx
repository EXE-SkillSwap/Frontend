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
import { addCourses } from "@/services/api/coursesService";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Link as LinkIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const emptySkill = () => ({
  courseName: "",
  price: "",
  link: "",
  description: "",
  bannerUrl: "",
  achievements: "",
});

const AddSkill = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([emptySkill()]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notMembsershipDialogOpen, setNotMembershipDialogOpen] =
    useState(false);

  const handleInputChange = (idx, e) => {
    const { name, value } = e.target;
    setSkills((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [name]: value } : s))
    );
  };

  const handleAddRow = () => {
    setSkills((prev) => [...prev, emptySkill()]);
  };

  const handleRemoveRow = (idx) => {
    setSkills((prev) => prev.filter((_, i) => i !== idx));
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
    // Validate all skills
    for (let i = 0; i < skills.length; i++) {
      const s = skills[i];
      if (!s.courseName.trim()) {
        toast.error(`Vui lòng nhập tên kỹ năng cho dòng ${i + 1}`);
        return;
      }
      if (!s.price.trim()) {
        toast.error(`Vui lòng nhập giá khóa học cho dòng ${i + 1}`);
        return;
      }
      if (!s.link.trim()) {
        toast.error(`Vui lòng nhập link bằng chứng cho dòng ${i + 1}`);
        return;
      }
      if (!validateUrl(s.link)) {
        toast.error(`Vui lòng nhập URL hợp lệ cho dòng ${i + 1}`);
        return;
      }
      if (!s.description.trim()) {
        toast.error(`Vui lòng nhập mô tả kỹ năng cho dòng ${i + 1}`);
        return;
      }
      if (s.bannerUrl && !validateUrl(s.bannerUrl)) {
        toast.error(`Vui lòng nhập URL hợp lệ cho hình ảnh dòng ${i + 1}`);
        return;
      }
      if (!s.achievements.trim()) {
        toast.error(`Vui lòng nhập quyền lợi cho học viên dòng ${i + 1}`);
        return;
      }
    }
    setIsSubmitting(true);
    try {
      const response = await addCourses(skills);
      console.log(response);
      toast.success("Thêm khóa học thành công!");
      navigate("/profile");
    } catch (error) {
      if (error.response?.data?.errorCode === 3003) {
        toast.info(error.response?.data?.message);
        setNotMembershipDialogOpen(true);
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
                Điền đầy đủ thông tin cho từng khóa học
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 mb-2 rounded-lg border border-blue-100 bg-blue-50/40 relative"
                  >
                    {skills.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveRow(idx)}
                        className="absolute top-2 right-2 text-red-500 hover:bg-red-100"
                        title="Xóa kỹ năng này"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Skill Name */}
                      <div className="space-y-2">
                        <Label
                          htmlFor={`courseName-${idx}`}
                          className="text-sm font-semibold text-gray-700"
                        >
                          Tên Khóa Học *
                        </Label>
                        <Input
                          id={`courseName-${idx}`}
                          name="courseName"
                          type="text"
                          placeholder="Ví dụ: Tán Gái, Thả Thính, Ảo Thuật..."
                          value={skill.courseName}
                          onChange={(e) => handleInputChange(idx, e)}
                          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      {/* Course Price */}
                      <div className="space-y-2">
                        <Label
                          htmlFor={`price-${idx}`}
                          className="text-sm font-semibold text-gray-700"
                        >
                          Giá Khóa Học (VNĐ) *
                        </Label>
                        <div className="relative">
                          <Input
                            id={`price-${idx}`}
                            name="price"
                            type="number"
                            placeholder="Ví dụ: 500000"
                            value={skill.price}
                            onChange={(e) => handleInputChange(idx, e)}
                            className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            required
                          />
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500">
                          Nhập giá khóa học mà bạn muốn dạy cho kỹ năng này
                        </p>
                      </div>
                    </div>
                    {/* Evidence Link */}
                    <div className="space-y-2 mt-4">
                      <Label
                        htmlFor={`link-${idx}`}
                        className="text-sm font-semibold text-gray-700"
                      >
                        Link Bằng Chứng *
                      </Label>
                      <div className="relative">
                        <Input
                          id={`link-${idx}`}
                          name="link"
                          type="url"
                          placeholder="https://example.com/certificate hoặc https://youtube.com/watch?v=..."
                          value={skill.link}
                          onChange={(e) => handleInputChange(idx, e)}
                          className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Upload className="h-3 w-3" />
                        <span>
                          Có thể là chứng chỉ, video demo, hoặc portfolio
                        </span>
                      </div>
                      {skill.link && !validateUrl(skill.link) && (
                        <p className="text-xs text-red-500">
                          Vui lòng nhập URL hợp lệ
                        </p>
                      )}
                    </div>
                    {/* Description */}
                    <div className="space-y-2 mt-4">
                      <Label
                        htmlFor={`description-${idx}`}
                        className="text-sm font-semibold text-gray-700"
                      >
                        Mô Tả Kỹ Năng
                      </Label>
                      <Textarea
                        id={`description-${idx}`}
                        name="description"
                        placeholder="Mô tả chi tiết về kỹ năng của bạn, kinh nghiệm, và những gì bạn có thể dạy..."
                        value={skill.description}
                        onChange={(e) => handleInputChange(idx, e)}
                        className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">
                        Mô tả sẽ giúp người khác hiểu rõ hơn về khả năng của bạn
                      </p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label
                        htmlFor={`description-${idx}`}
                        className="text-sm font-semibold text-gray-700"
                      >
                        Quyền lợi của học viên
                      </Label>
                      <Textarea
                        id={`description-${idx}`}
                        name="achievements"
                        placeholder="Mô tả quyền lợi của học viên khi tham gia khóa học này..."
                        value={skill.achievements}
                        onChange={(e) => handleInputChange(idx, e)}
                        className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 min-h-[100px]"
                        rows={3}
                      />
                      <p className="text-xs text-gray-500">
                        Các quyền lợi của học viên tách biệt bởi dấu chấm.
                      </p>
                    </div>
                    {/* upload Banner image */}
                    <div className="space-y-2 mt-4">
                      <Label
                        htmlFor={`bannerUrl-${idx}`}
                        className="text-sm font-semibold text-gray-700"
                      >
                        Hình Ảnh Banner (Tùy chọn)
                      </Label>
                      <Input
                        id={`bannerUrl-${idx}`}
                        name="bannerUrl"
                        type="url"
                        placeholder="https://example.com/banner.jpg"
                        value={skill.bannerUrl}
                        onChange={(e) => handleInputChange(idx, e)}
                        className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500">
                        Bạn có thể thêm hình ảnh đại diện cho kỹ năng này
                      </p>
                      {skill.bannerUrl && (
                        <img
                          src={skill.bannerUrl}
                          alt={`Banner for ${skill.title}`}
                          className="mt-2 h-32 w-32 object-cover rounded-md"
                        />
                      )}
                      {skill.bannerUrl && !validateUrl(skill.bannerUrl) && (
                        <p className="text-xs text-red-500">
                          Vui lòng nhập URL hợp lệ cho hình ảnh
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddRow}
                    className="flex items-center gap-2 mt-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Đang thêm...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Thêm
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
