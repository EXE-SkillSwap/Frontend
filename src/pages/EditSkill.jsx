import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, DollarSign, Link as LinkIcon } from "lucide-react";
import { getUserSkillById, updateUserSkill } from "@/api/services/skillService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ChaseLoading from "@/components/common/loading/ChaseLoading";

const EditSkill = () => {
  const navigate = useNavigate();
  const { skillId } = useParams();
  const [formData, setFormData] = useState({
    skillName: "",
    coursePrice: "",
    evidenceLink: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSkillData = async () => {
    try {
      setLoading(true);
      const response = await getUserSkillById(skillId);
      if (response && response.data) {
        const skill = response.data;
        setFormData({
          skillName: skill.skillName || "",
          coursePrice: skill.coursePrice?.toString() || "",
          evidenceLink: skill.evidenceLink || "",
          description: skill.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching skill:", error);
      toast.error("Không thể tải thông tin kỹ năng");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skillId) {
      fetchSkillData();
    }
  }, [skillId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.skillName.trim()) {
      toast.error("Vui lòng nhập tên kỹ năng");
      return;
    }

    if (!formData.coursePrice.trim()) {
      toast.error("Vui lòng nhập giá khóa học");
      return;
    }

    if (!formData.evidenceLink.trim()) {
      toast.error("Vui lòng nhập link bằng chứng");
      return;
    }

    if (!validateUrl(formData.evidenceLink)) {
      toast.error("Vui lòng nhập URL hợp lệ cho link bằng chứng");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const skillData = {
        skillName: formData.skillName.trim(),
        coursePrice: parseInt(formData.coursePrice),
        evidenceLink: formData.evidenceLink.trim(),
        description: formData.description.trim(),
      };

      const response = await updateUserSkill(skillId, skillData);
      
      if (response && response.data) {
        toast.success("Cập nhật kỹ năng thành công!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-10">
            <ChaseLoading />
          </div>
          <p className="text-muted-foreground">Đang tải thông tin kỹ năng....</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
            className="mb-4 flex items-center gap-2 hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Profile
          </Button>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4">
              <Save className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Chỉnh Sửa Kỹ Năng
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cập nhật thông tin kỹ năng của bạn để phản ánh chính xác khả năng hiện tại.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Thông Tin Kỹ Năng
              </CardTitle>
              <CardDescription className="text-gray-600">
                Cập nhật thông tin kỹ năng của bạn
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Skill Name */}
                <div className="space-y-2">
                  <Label htmlFor="skillName" className="text-sm font-semibold text-gray-700">
                    Tên Kỹ Năng *
                  </Label>
                  <div className="relative">
                    <Input
                      id="skillName"
                      name="skillName"
                      type="text"
                      placeholder="Ví dụ: React.js, Python, UI/UX Design..."
                      value={formData.skillName}
                      onChange={handleInputChange}
                      className="pl-10 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Badge className="bg-green-100 text-green-700 border-0">
                        <Save className="h-3 w-3 mr-1" />
                        Skill
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Course Price */}
                <div className="space-y-2">
                  <Label htmlFor="coursePrice" className="text-sm font-semibold text-gray-700">
                    Giá Khóa Học (VNĐ) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="coursePrice"
                      name="coursePrice"
                      type="number"
                      placeholder="Ví dụ: 500000"
                      value={formData.coursePrice}
                      onChange={handleInputChange}
                      className="pl-10 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      min="0"
                      required
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Nhập giá khóa học mà bạn muốn dạy cho kỹ năng này
                  </p>
                </div>

                {/* Evidence Link */}
                <div className="space-y-2">
                  <Label htmlFor="evidenceLink" className="text-sm font-semibold text-gray-700">
                    Link Bằng Chứng *
                  </Label>
                  <div className="relative">
                    <Input
                      id="evidenceLink"
                      name="evidenceLink"
                      type="url"
                      placeholder="https://example.com/certificate hoặc https://youtube.com/watch?v=..."
                      value={formData.evidenceLink}
                      onChange={handleInputChange}
                      className="pl-10 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Upload className="h-3 w-3" />
                    <span>Có thể là chứng chỉ, video demo, hoặc portfolio</span>
                  </div>
                  {formData.evidenceLink && !validateUrl(formData.evidenceLink) && (
                    <p className="text-xs text-red-500">
                      Vui lòng nhập URL hợp lệ
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Mô Tả Kỹ Năng
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Mô tả chi tiết về kỹ năng của bạn, kinh nghiệm, và những gì bạn có thể dạy..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500">
                    Mô tả sẽ giúp người khác hiểu rõ hơn về khả năng của bạn
                  </p>
                </div>

                {/* Preview Card */}
                {formData.skillName && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-2">Xem Trước:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700">Kỹ năng:</Badge>
                        <span className="font-medium">{formData.skillName}</span>
                      </div>
                      {formData.coursePrice && (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">Giá:</Badge>
                          <span className="font-medium">
                            {parseInt(formData.coursePrice).toLocaleString('vi-VN')} VNĐ
                          </span>
                        </div>
                      )}
                      {formData.evidenceLink && validateUrl(formData.evidenceLink) && (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-100 text-emerald-700">Bằng chứng:</Badge>
                          <a 
                            href={formData.evidenceLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline truncate"
                          >
                            {formData.evidenceLink}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
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
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Đang cập nhật...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Cập Nhật Kỹ Năng
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default EditSkill;