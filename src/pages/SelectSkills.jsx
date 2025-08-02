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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Check,
  X,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Zap,
  Star,
  ArrowRight,
  BookOpen,
  Users,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SelectSkills = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  // Filtered skills based on search
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [skills, searchTerm]);

  // Progress calculation
  const progress = Math.min((selectedSkills.length / 5) * 100, 100);

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
      const response = await getSkills();
      setSkills(response.data);
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

    setIsLoading(true);
    let selectedSkillNames = getSelectedSkillNames();

    try {
      const response = await updateUserSkills(selectedSkillNames.join("#"));
      if (response) {
        toast.success("🎉 " + response.data);
        nav("/");
      }
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Lỗi khi lưu kỹ năng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    nav("/");
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/40 rounded-full blur-xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 p-6 lg:p-8"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-3 h-3 text-yellow-800" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Khám Phá Sở Thích Của Bạn
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Chọn những sở thích của bạn. Giúp chúng tôi cải tiến và hiểu bạn
                hơn. Hãy tự tin thể hiện bản thân -
                <span className="font-semibold text-purple-600">
                  {" "}
                  mỗi sở thích là một cánh cửa mở ra cơ hội mới!
                </span>
              </p>
            </div>

            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">
                  Tiến độ của bạn
                </span>
                <span className="text-sm font-bold text-purple-600">
                  {selectedSkills.length}/5+
                </span>
              </div>
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-xs text-gray-500">
                {selectedSkills.length === 0 &&
                  "Hãy bắt đầu chọn sở thích đầu tiên! 🚀"}
                {selectedSkills.length > 0 &&
                  selectedSkills.length < 3 &&
                  "Tuyệt vời! Hãy chọn thêm vài sở thích nữa 💪"}
                {selectedSkills.length >= 3 &&
                  selectedSkills.length < 5 &&
                  "Xuất sắc! Bạn đang làm rất tốt 🌟"}
                {selectedSkills.length >= 5 &&
                  "Hoàn hảo! Bạn đã sẵn sàng để tỏa sáng ✨"}
              </p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Tìm kiếm sở thích..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Selected Skills Summary */}
          <AnimatePresence>
            {selectedSkills.length > 0 && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="border-none shadow-xl bg-gradient-to-r from-green-50 to-blue-50 border-green-200/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2 text-green-800">
                            Kỹ Năng Đã Chọn
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              {selectedSkills.length}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="text-green-600">
                            {selectedSkills.length === 1 &&
                              "Bước đầu tuyệt vời! 🎯"}
                            {selectedSkills.length > 1 &&
                              selectedSkills.length < 5 &&
                              "Bạn đang trên đường thành công! 🚀"}
                            {selectedSkills.length >= 5 &&
                              "Ấn tượng! Bạn có rất nhiều tài năng! 🌟"}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearAll}
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Xóa tất cả
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {getSelectedSkillNames().map((skillName) => {
                          const skill = skills.find(
                            (s) => s.name === skillName
                          );
                          return (
                            <motion.div
                              key={skill?.id}
                              variants={skillVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                            >
                              <Badge
                                variant="default"
                                className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-1.5 transition-all duration-200 transform hover:scale-105"
                                onClick={() => toggleSkill(skillName)}
                              >
                                <Star className="w-3 h-3 mr-1" />
                                {skillName}
                                <X className="ml-2 h-3 w-3" />
                              </Badge>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Thư Viện Kỹ Năng
                    </CardTitle>
                    <CardDescription>
                      {filteredSkills.length} kỹ năng có sẵn{" "}
                      {searchTerm && `cho "${searchTerm}"`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  <AnimatePresence>
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.02 }}
                        layout
                      >
                        <Button
                          variant={
                            isSelected(skill.name) ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => toggleSkill(skill.name)}
                          className={`w-full transition-all duration-300 transform hover:scale-105 ${
                            isSelected(skill.name)
                              ? "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg border-none"
                              : "hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 border-gray-200"
                          }`}
                        >
                          {isSelected(skill.name) ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : (
                            <Zap className="mr-2 h-4 w-4 text-purple-500" />
                          )}
                          <span className="truncate">{skill.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {filteredSkills.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Không tìm thấy kỹ năng nào phù hợp với "{searchTerm}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    onClick={handleSave}
                    disabled={selectedSkills.length === 0 || isLoading}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                    <div className="relative flex items-center gap-3">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <TrendingUp className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      )}
                      <span>
                        {isLoading
                          ? "Đang lưu..."
                          : `Bắt Đầu Hành Trình (${selectedSkills.length})`}
                      </span>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSkip}
                    className="px-8 py-4 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Để sau
                  </Button>
                </div>

                {selectedSkills.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-gray-500 mt-4"
                  >
                    🎉 Bạn đã chọn {selectedSkills.length} kỹ năng. Hãy tiếp tục
                    khám phá và phát triển!
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectSkills;
