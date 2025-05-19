import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="flex items-center justify-center p-8 bg-white/10">
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
                ĐĂNG NHẬP
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 p-8 pt-0">
            <form className="space-y-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="text-[#111827]">
                  Email
                </Label>
                <Input
                  id="email"
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu của bạn"
                  required
                  className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={() => setShowPassword(!showPassword)}
                  className="mr-2 border-[#6B7280] data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1]"
                />
                <Label
                  htmlFor="show-password"
                  className="text-sm text-[#6B7280]"
                >
                  Hiển thị mật khẩu
                </Label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white transition-all duration-200"
                >
                  <LogIn className="mr-2" />
                  Đăng Nhập
                </Button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-sm text-center text-[#6B7280]">
                <a className="text-[#F43F5E] hover:text-[#F43F5E]/80 transition-colors cursor-pointer">
                  Quên Mật khẩu?
                </a>
              </p>
              <p className="text-sm text-center text-[#6B7280]">
                <a className="text-[#6366F1] hover:text-[#6366F1]/80 transition-colors cursor-pointer">
                  Đăng Kí Tài Khoản
                </a>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
