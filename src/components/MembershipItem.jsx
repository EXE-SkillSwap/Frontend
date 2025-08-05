import { buyMembership } from "@/services/api/membershipService";
import CircleLoading from "@/components/common/loading/CircleLoading";
import PaymentDialog from "@/components/dialog/PaymentDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAuthenticated } from "@/utils/auth.utils";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MembershipItem = ({ packageData, isPopular = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const nav = useNavigate();
  const features =
    packageData?.features
      .split(".")
      .filter((feature) => feature.trim() !== "") || [];

  const handleBuyMembership = async (id) => {
    if (isAuthenticated() === false) {
      toast.info("Vui lòng đăng nhập để mua gói thành viên.");
      nav("/login");
      return;
    }
    setIsLoading(true);
    try {
      const response = await buyMembership(id);
      setPaymentData(response.data);
      setOpenPaymentDialog(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error buying membership:", error);
    }
  };
  return (
    <>
      <Card
        className={`relative border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 
        ${isPopular ? "scale-105 border-purple-500" : "hover:scale-[1.02]"}`}
      >
        {packageData.bought && (
          <Badge className="absolute -top-3 right-8 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1">
            Đang Sử Dụng
          </Badge>
        )}

        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 rounded-full bg-purple-100 text-purple-600 
              ${
                isPopular
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : ""
              }`}
            >
              <Star className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {packageData?.name}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {packageData?.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-baseline justify-center gap-1 bg-purple-50 py-4 rounded-lg">
            <span className="text-5xl font-bold text-purple-700">
              {packageData?.price.toLocaleString()}₫
            </span>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                /{packageData?.duration} ngày
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-purple-100 p-1 rounded-full">
                  <Check className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm">{feature.trim()}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4 flex flex-col items-center">
          {isLoading ? (
            <div className="w-full flex justify-center">
              <CircleLoading />
            </div>
          ) : (
            <Button
              variant="default"
              className={`w-full py-6 text-base font-semibold cursor-pointer transition-colors duration-300
              ${
                isPopular
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  : "bg-white border-2 border-purple-500 text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => handleBuyMembership(packageData.id)}
            >
              Mua Ngay
            </Button>
          )}
        </CardFooter>
      </Card>
      {openPaymentDialog && (
        <PaymentDialog
          open={openPaymentDialog}
          setOpen={setOpenPaymentDialog}
          paymentData={paymentData}
        />
      )}
    </>
  );
};

export default MembershipItem;
