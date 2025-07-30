import { getSkills, updateUserSkills } from "@/services/api/userService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SelectSkills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const nav = useNavigate();

  const toggleSkill = (name) => {
    setSelectedSkills((prev) =>
      prev.includes(name) ? prev.filter((id) => id !== name) : [...prev, name]
    );
  };

  const clearAll = () => {
    setSelectedSkills([]);
  };

  const isSelected = (name) => selectedSkills.includes(name);

  const getSelectedSkillNames = () => {
    return skills
      .filter((skill) => selectedSkills.includes(skill.name))
      .map((skill) => skill.name);
  };

  const fetchSkills = async () => {
    try {
      const reponse = await getSkills();
      setSkills(reponse.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Lỗi khi tải kỹ năng. Vui lòng thử lại sau.");
    }
  };

  const handleSave = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Vui lòng chọn ít nhất một kỹ năng.");
      return;
    }
    // Here you would typically send the selected skills to your backend
    let selectedSkillNames = getSelectedSkillNames();

    try {
      const response = await updateUserSkills(selectedSkillNames.join("#"));
      if (response) {
        toast.success(response.data);
        nav("/");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Lỗi khi lưu kỹ năng. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-rose-200 p-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Hãy Chọn Kỹ Năng Mà Bạn Thành Thạo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chọn những kỹ năng mà bạn tự tin nhất. Bạn có thể chọn nhiều kỹ
              năng để thể hiện khả năng của mình. Những kỹ năng này sẽ giúp bạn
              kết nối với những người có cùng sở thích và mục tiêu.
            </p>
          </div>

          {/* Selected Skills Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Kỹ Năng Đã Chọn
                    <Badge variant="secondary">{selectedSkills.length}</Badge>
                  </CardTitle>
                  <CardDescription>
                    {selectedSkills.length === 0
                      ? "Chưa có kỹ năng nào được chọn"
                      : ` ${selectedSkills.length} kỹ năng`}
                  </CardDescription>
                </div>
                {selectedSkills.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Xóa
                  </Button>
                )}
              </div>
            </CardHeader>
            {selectedSkills.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getSelectedSkillNames().map((skillName) => {
                    const skill = skills.find((s) => s.name === skillName);
                    return (
                      <Badge
                        key={skill.id}
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 transition-colors"
                        onClick={() => toggleSkill(skill.id)}
                      >
                        {skillName}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>

          {/* All Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Các kỹ năng</CardTitle>
              <CardDescription>
                Chọn các kỹ năng mà bạn tự tin nhất. Bạn có thể chọn nhiều kỹ
                năng để thể hiện khả năng của mình.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <Button
                    key={skill.id}
                    variant={isSelected(skill.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSkill(skill.name)}
                    className={`transition-all duration-200 ${
                      isSelected(skill.name)
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "hover:bg-muted hover:scale-105"
                    }`}
                  >
                    {isSelected(skill.name) && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {skill.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {selectedSkills.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="flex items-center gap-2 bg-indigo-500 cursor-pointer hover:bg-indigo-600 transition-colors"
                    onClick={handleSave}
                  >
                    <Check className="h-5 w-5" />
                    Lưu ({selectedSkills.length})
                  </Button>
                  <Button variant="outline" size="lg">
                    Để sau
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SelectSkills;
