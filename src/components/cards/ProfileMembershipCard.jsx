import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Crown } from "lucide-react";
import moment from "moment/moment";

const ProfileMembershipCard = ({ userMembership }) => {
  return (
    <Card className="relative overflow-hidden border-l-0 shadow-lg bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full translate-y-6 -translate-x-6"></div>

      {/* Left border accent */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 via-yellow-500 to-orange-500"></div>

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="flex items-center text-lg font-bold">
          <div className="p-2 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg mr-3 shadow-md">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Thông tin Gói Thành Viên
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        {/* Upgrade Button (if not premium) */}
        {!userMembership ? (
          <div className="mt-4 pt-4 border-t border-amber-200/50">
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => {
                nav("/membership");
              }}
            >
              <Crown className="h-4 w-4 mr-2" />
              Nâng cấp gói thành viên
            </Button>
          </div>
        ) : (
          <>
            {/* Membership Name */}
            <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
              <span className="text-sm font-medium text-gray-700">
                Gói thành viên hiện tại:
              </span>
              <Badge
                variant={
                  userMembership?.membership?.name ? "default" : "secondary"
                }
                className={`${
                  userMembership?.membership?.name
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-500"
                } font-medium px-3 py-1`}
              >
                {userMembership?.membership?.name || "Chưa có gói thành viên"}
              </Badge>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-amber-200/50">
              <span className="text-sm font-medium text-gray-700">
                Trạng thái:
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    userMembership?.status === "ACTIVE"
                      ? "bg-green-500 animate-pulse"
                      : "bg-gray-400"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    userMembership?.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {userMembership?.status === "ACTIVE"
                    ? "Đang hoạt động"
                    : "Không hoạt động"}
                </span>
              </div>
            </div>

            {/* Date Information */}
            <div className="grid grid-cols-1 gap-3">
              {/* Start Date */}
              <div className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-amber-200/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Ngày đăng ký:
                  </span>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {userMembership?.startDate
                    ? moment(userMembership?.startDate).format("DD/MM/YYYY")
                    : "Chưa có"}
                </span>
              </div>

              {/* End Date */}
              <div className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm rounded-lg border border-amber-200/30">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Ngày hết hạn:
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    userMembership?.endDate
                      ? moment(userMembership?.endDate).isAfter(moment())
                        ? "text-green-600"
                        : "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {userMembership?.endDate
                    ? moment(userMembership.endDate).format("DD/MM/YYYY")
                    : "Chưa có"}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileMembershipCard;
