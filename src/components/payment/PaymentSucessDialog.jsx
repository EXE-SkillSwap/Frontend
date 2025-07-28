import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const PaymentSucessDialog = () => {
  return (
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
      <CardContent className="space-y-6"></CardContent>
    </Card>
  );
};

export default PaymentSucessDialog;
