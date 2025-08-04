import CircleLoading from "@/components/common/loading/CircleLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { googleLogin } from "@/services/api/authService";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const GoogleCallback = () => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const accessTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const fetchToken = async () => {
        const authCode = isMatch[1];
        try {
          const response = await googleLogin(authCode);
          if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userRole", decodedToken?.scope);
            if (decodedToken?.scope === "USER") {
              if (response.data?.firstLogin) {
                nav("/skills");
              } else {
                nav("/");
              }
            }
          }

          setIsLoggedIn(true);
        } catch (error) {
          console.error("Login failed:", error);
          toast.error(
            error.response?.data?.message ||
              "Đăng nhập không thành công. Vui lòng thử lại."
          );
          nav("/login");
        }
      };
      fetchToken();
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Đăng nhập thành công!");
      nav("/");
    }
  }, [isLoggedIn, nav]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "1s" }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-lg">
          <CardHeader className="text-center pb-6">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-4"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-300 to-purple-300 rounded-2xl flex items-center justify-center shadow-lg">
                  <FcGoogle className="w-8 h-8" />
                </div>

                {/* Status indicator */}
                <div className="absolute -top-2 -right-2">
                  {status === "loading" && (
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                      <RefreshCw className="w-3 h-3 text-white animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {status === "loading" && "Đang xử lý..."}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Loading State */}
            {status === "loading" && (
              <motion.div
                variants={itemVariants}
                className="text-center space-y-4"
              >
                <CircleLoading />
                <p className="text-gray-600">
                  Đang xác thực tài khoản Google của bạn...
                </p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse delay-1000"></div>
      </motion.div>
    </div>
  );
};

export default GoogleCallback;
