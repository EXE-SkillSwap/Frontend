import { register } from "@/api/services/userService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { EyeClosedIcon, EyeIcon, UserPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await register(data);
      if (response.status === 201) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => {
          nav("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Đăng ký thất bại. Vui lòng thử lại."
        );
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    }
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
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập họ của bạn"
                              {...field}
                              className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="">
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tên của bạn"
                              {...field}
                              className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập email của bạn"
                            {...field}
                            className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Nhập mật khẩu của bạn"
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Nhập lại mật khẩu của bạn"
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className="mt-1 bg-white/70 border-[#D1D5DB] focus:border-[#6366F1] focus:ring-[#6366F1] text-[#111827] transition-all duration-200"
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white transition-all duration-200 cursor-pointer"
                  >
                    <UserPlus className="mr-2" />
                    Đăng Ký
                  </Button>
                </motion.div>
              </form>
            </Form>

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
