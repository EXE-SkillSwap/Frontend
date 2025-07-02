import React, { useEffect, useState } from "react";

import { getMemberships } from "@/api/services/membershipService";
import MembershipItem from "@/components/MembershipItem";
import CircleLoading from "@/components/common/loading/CircleLoading";
import ChaseLoading from "@/components/common/loading/ChaseLoading";

const Membership = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await getMemberships();
      setPackages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ChaseLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-indigo-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Chọn
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Gói Thành Viên
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Chúng tôi cung cấp các gói thành viên linh hoạt để phù hợp với nhu
            cầu của bạn. Từ cá nhân đến doanh nghiệp, chúng tôi có giải pháp cho
            mọi đối tượng.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className={`grid md:grid-cols-${packages.length} gap-8 mb-20`}>
          {packages.map((pkg, index) => (
            <div className="" key={index}>
              <MembershipItem packageData={pkg} />
            </div>
          ))}
          {packages.length === 0 && (
            <div className="col-span-full text-center">
              <p className="text-lg text-muted-foreground">
                Hiện tại không có gói thành viên nào.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Membership;
