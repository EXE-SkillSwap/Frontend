import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import svg from "@/assets/undraw_confirmed_c5lo.svg";
const PaymentSucess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-rose-200 flex items-center justify-center p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
        </div>
      )}

      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500 animate-pulse" />
              <div className="absolute inset-0 h-20 w-20 rounded-full bg-green-500/20 animate-ping"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Thanh toán thành công!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Cảm ơn bạn đã đăng ký! Chúng tôi đã nhận được thanh toán của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <img src={svg} alt="Success" className="w-auto h-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSucess;
