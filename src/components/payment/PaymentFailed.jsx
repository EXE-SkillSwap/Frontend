import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 to-rose-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <XCircle className="h-20 w-20 text-red-500" />
              <div className="absolute inset-0 h-20 w-20 rounded-full bg-red-500/10 animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Thanh toán không thành công!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Rất tiếc, đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại
            hoặc liên hệ với chúng tôi để được hỗ trợ.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentFailed;
