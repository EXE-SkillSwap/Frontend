import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const SignUp = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const email = form.elements.namedItem("email")?.value.trim();
    const password = form.elements.namedItem("password")?.value.trim();
    const confirmPassword = form.elements
      .namedItem("confirmPassword")
      ?.value.trim();

    if (!email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setSuccess("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold text-center text-[#111827]">
                ĐĂNG KÝ TÀI KHOẢN
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-[#111827]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email của bạn"
                  required
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="password" className="text-[#111827]">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mật khẩu của bạn"
                  required
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label htmlFor="confirmPassword" className="text-[#111827]">
                  Xác nhận mật khẩu
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  required
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              {error && (
                <motion.p
                  variants={itemVariants}
                  className="text-red-600 text-center"
                >
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p
                  variants={itemVariants}
                  className="text-green-700 text-center"
                >
                  {success}
                </motion.p>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white transition-all duration-200"
                >
                  <UserPlus className="mr-2" />
                  Đăng Ký
                </Button>
              </motion.div>
            </form>

            <motion.div
              variants={itemVariants}
              className="text-sm text-center text-[#6B7280]"
            >
              <a
                className="text-[#6366F1] hover:text-[#6366F1]/80 cursor-pointer transition-colors"
                onClick={() => nav("/login")}
              >
                Đã có tài khoản? Đăng Nhập
              </a>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
