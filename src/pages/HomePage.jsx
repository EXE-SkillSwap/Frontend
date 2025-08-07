import BannerCarousel from "@/components/common/BannerCarousel";
import { getBestCourses } from "@/services/api/coursesService";
import { isAuthenticated } from "@/utils/auth.utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Code, Palette, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Phát triển Web", icon: Code },
  { name: "Khoa học Dữ liệu", icon: TrendingUp },
  { name: "Thiết kế", icon: Palette },
  { name: "Marketing", icon: BookOpen },
];

const steps = [
  {
    step: 1,
    title: "Đăng kí tài khoản và chọn các kĩ năng",
    description: "Duyệt và chọn sở thích của bạn.",
  },
  {
    step: 2,
    title: "Kết bạn và học tập",
    description: "Kết nối với những người cùng sở thích và bắt đầu học.",
  },
  {
    step: 3,
    title: "Diễn đàn và Chia sẻ",
    description: "Tham gia cộng đồng và chia sẻ kiến thức.",
  },
];

const HomePage = () => {
  // Refs cho các phần
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const newsletterRef = useRef(null);
  // Refs cho mảng thẻ khóa học & đánh giá (cho hiệu ứng hover)
  const courseCardRefs = useRef([]);
  const nav = useNavigate();

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await getBestCourses(3, 0);
      setCourses(response.data?.content);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Không thể tải khóa học. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchCourses();
    }

    const sections = [
      featuredRef.current,
      categoriesRef.current,
      howItWorksRef.current,
      newsletterRef.current,
    ];
    // Hiệu ứng cuộn cho các phần
    sections.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    });
    // Thêm hiệu ứng hover cho thẻ khóa học
    courseCardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.06,
            boxShadow: "0px 16px 32px rgba(80,0,120,0.13)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      }
    });
    // Dọn dẹp event listener khi unmount
    return () => {
      courseCardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <main className="relative z-0 bg-gradient-to-b from-purple-50 via-violet-50 to-indigo-50 min-h-screen mt-16">
      {/* Banner Chính */}
      <BannerCarousel />
      {isAuthenticated() && (
        <section
          ref={featuredRef}
          className="fade-in-section py-20 px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
            Các kĩ năng trao đổi cùng nhau
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg">
            Khám phá các lộ trình học hàng đầu được chọn lọc kỹ lưỡng cho sự
            phát triển của bạn.
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => (courseCardRefs.current[index] = el)}
                className="cursor-pointer rounded-3xl shadow-xl overflow-hidden bg-white border-0 transition-all duration-300 group relative"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.bannerUrl}
                    alt={course.courseName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold mb-2 text-purple-900 group-hover:text-indigo-600 transition-colors">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-600 text-base mb-4">
                    {course.description}
                  </p>
                  <button
                    onClick={() => nav(`/course/${course.id}`)}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-pink-600 hover:to-indigo-700 transition-all"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Phần Danh Mục Phổ Biến */}
      <section ref={categoriesRef} className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Danh Mục Phổ Biến
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {categories.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="p-8 bg-white rounded-2xl cursor-pointer hover:bg-purple-100 transition group shadow-md flex flex-col items-center gap-3 border-2 border-purple-100 hover:border-purple-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-100 mb-2 shadow">
                <Icon className="w-8 h-8 text-purple-600 group-hover:text-indigo-600 transition" />
              </div>
              <h3 className="font-semibold text-lg text-purple-800 group-hover:text-indigo-700 transition">
                {name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Phần Cách Thức Hoạt Động */}
      <section
        ref={howItWorksRef}
        className="py-20 px-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Cách Thức Hoạt Động
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map(({ step, title, description }) => (
            <div
              key={step}
              className="p-8 bg-white rounded-3xl shadow-xl flex flex-col items-center hover:scale-105 transition-all border-2 border-purple-100 hover:border-indigo-200"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white text-3xl font-bold mb-4 shadow-lg">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">
                {title}
              </h3>
              <p className="text-gray-600 text-base">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
