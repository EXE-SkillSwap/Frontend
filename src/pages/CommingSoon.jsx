import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MailIcon } from "lucide-react";
import { motion } from "framer-motion";
import commingSoon from "@/assets/commingsoon.png";

const CommingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full"
      >
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8 text-center">
            <img
              src={commingSoon}
              alt="Minh họa sắp ra mắt"
              className="mx-auto h-48 mb-6"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Sắp Ra Mắt
            </h1>
            <p className="text-gray-600 mb-6">
              Chúng tôi đang nỗ lực để mang đến cho bạn điều tuyệt vời. Hãy theo
              dõi và đăng ký để là người đầu tiên biết nhé!
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="pl-10"
                />
              </div>
              <Button className="w-full sm:w-auto">Thông Báo Cho Tôi</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommingSoon;