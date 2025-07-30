import { login } from "@/services/api/authService";
import LoginIllustration from "@/components/common/illustration/LoginIllustration";
import CircleLoading from "@/components/common/loading/CircleLoading";
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
import { loginSchema } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { EyeClosedIcon, EyeIcon, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", decodedToken?.scope);
        if (decodedToken?.scope === "ADMIN") {
          nav("/admin/dashboard");
          toast.success("Đăng nhập thành công với quyền quản trị!");
        }
        if (decodedToken?.scope === "USER") {
          nav("/");
          toast.success("Đăng nhập thành công!");
        }
      }
      if (response.data?.firstLogin) {
        nav("/skills");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      setError(
        error.response?.data?.message ||
          "Đăng nhập không thành công. Vui lòng thử lại."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-8">
        {/* Left side illustration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-full max-w-md"
        >
          <div className="relative">
            <LoginIllustration />

            {/* Title for illustration */}
            <h2 className="text-2xl font-bold text-center text-indigo-900 mt-4">
              Chia Sẻ Kỹ Năng
            </h2>
            <p className="text-center text-indigo-700">
              Kết nối và phát triển cùng cộng đồng
            </p>
          </div>
        </motion.div>

        {/* Login card */}
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
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={loginForm.control}
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
                      control={loginForm.control}
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
                  {error && (
                    <motion.div
                      variants={itemVariants}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <CircleLoading />
                    </div>
                  ) : (
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        className="w-full bg-[#6366F1] hover:bg-[#6366F1]/90 text-white transition-all duration-200 cursor-pointer"
                      >
                        <LogIn className="mr-2" />
                        Đăng Nhập
                      </Button>
                    </motion.div>
                  )}
                </form>
              </Form>

              <motion.div variants={itemVariants} className="space-y-2">
                <p className="text-sm text-center text-[#6B7280]">
                  <a className="text-[#F43F5E] hover:text-[#F43F5E]/80 transition-colors cursor-pointer">
                    Quên Mật khẩu?
                  </a>
                </p>
                <p className="text-sm text-center text-[#6B7280]">
                  <a
                    className="text-[#6366F1] hover:text-[#6366F1]/80 transition-colors cursor-pointer"
                    onClick={() => nav("/register")}
                  >
                    Đăng Kí Tài Khoản
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
