import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRevenue, getStatistics } from "@/services/api/adminService";
import {
  Activity,
  Banknote,
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  UserCheck,
  Users,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

const Admin = () => {
  const [statistics, setStatistics] = useState({
    totalPosts: 0,
    totalCourses: 0,
    totalMemberships: 0,
    totalSubscriptions: 0,
    totalUsers: 0,
  });
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await getRevenue();
      setRevenue(response.data?.totalRevenue || 0);
    } catch (error) {
      console.error("Failed to fetch revenue:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    fetchRevenue();
  }, []);

  const handleRefresh = () => {
    fetchStatistics();
    fetchRevenue();
  };

  const statsCards = [
    {
      title: "Tổng người dùng",
      value: statistics.totalUsers,
      icon: Users,
      description: "Người dùng đã đăng ký",
    },
    {
      title: "Tổng bài viết",
      value: statistics.totalPosts,
      icon: FileText,
      description: "Bài viết trên diễn đàn",
    },
    {
      title: "Tổng khóa học",
      value: statistics.totalCourses,
      icon: BookOpen,
      description: "Khóa học được tạo",
    },
    {
      title: "Gói thành viên",
      value: statistics.totalMemberships,
      icon: CreditCard,
      description: "Gói thành viên có sẵn",
    },
    {
      title: "Đăng ký thành viên",
      value: statistics.totalSubscriptions,
      icon: UserCheck,
      description: "Người dùng đã đăng ký",
    },
    {
      title: "Tổng doanh thu",
      value: revenue,
      icon: Banknote,
      description: "Doanh thu từ việc mua gói thành viên",
      isRevenue: true,
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="p-6 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-900 rounded">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Trang quản trị viên
            </h1>
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="ml-auto"
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-600">
            Tổng quan hoạt động và quản lý hệ thống
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-medium text-gray-900">
              Thống kê hệ thống
            </h2>
          </div>

          {loading ? (
            renderLoadingSkeleton()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {statsCards.map((stat) => (
                <Card
                  key={stat.title}
                  className="border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-gray-100 rounded">
                        <stat.icon className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>

                      <p className="text-2xl font-semibold text-gray-900">
                        {stat.isRevenue
                          ? formatCurrency(stat.value)
                          : stat.value.toLocaleString()}
                      </p>

                      <p className="text-xs text-gray-500">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Overview */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">
                Tổng quan hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tổng người dùng</span>
                  <span className="font-medium">{statistics.totalUsers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Tỷ lệ thành viên
                  </span>
                  <span className="font-medium">
                    {statistics.totalUsers > 0
                      ? (
                          (statistics.totalSubscriptions /
                            statistics.totalUsers) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Bài viết/người dùng
                  </span>
                  <span className="font-medium">
                    {statistics.totalUsers > 0
                      ? (statistics.totalPosts / statistics.totalUsers).toFixed(
                          1
                        )
                      : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Overview */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">
                Tổng quan doanh thu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tổng doanh thu</span>
                  <span className="font-medium text-lg">
                    {formatCurrency(revenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Trung bình/đăng ký
                  </span>
                  <span className="font-medium">
                    {statistics.totalSubscriptions > 0
                      ? formatCurrency(revenue / statistics.totalSubscriptions)
                      : formatCurrency(0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Số đăng ký</span>
                  <span className="font-medium">
                    {statistics.totalSubscriptions}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
