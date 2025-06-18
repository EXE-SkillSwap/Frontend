import BannerCarousel from "@/components/common/BannerCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    title: "React cho người mới bắt đầu",
    description: "Học React cơ bản với các dự án thực hành.",
    image:
      "https://i.pinimg.com/736x/41/8b/00/418b0005c0c5b7e391f6c4802a2c3e80.jpg",
  },
  {
    id: 2,
    title: "Khoa học dữ liệu nâng cao",
    description: "Thành thạo kỹ thuật và công cụ khoa học dữ liệu.",
    image:
      "https://i.pinimg.com/736x/fc/e6/60/fce660bfd794ee5fdb0e7590a00a9328.jpg",
  },
  {
    id: 3,
    title: "Cơ bản về thiết kế UI/UX",
    description: "Thiết kế giao diện hấp dẫn và thân thiện với người dùng.",
    image:
      "https://i.pinimg.com/736x/46/0e/f3/460ef3c3fa05eae192e32d056fc5339d.jpg",
  },
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
  const testimonialRef = useRef(null);
  const categoriesRef = useRef(null);
  const instructorsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const newsletterRef = useRef(null);

  // Refs cho mảng thẻ khóa học & đánh giá (cho hiệu ứng hover)
  const courseCardRefs = useRef([]);
  const testimonialCardRefs = useRef([]);

  useEffect(() => {
    const sections = [
      featuredRef.current,
      testimonialRef.current,
      categoriesRef.current,
      instructorsRef.current,
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
        // khi chuột vào
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
        // khi chuột rời đi
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

    // Hiệu ứng hover cho thẻ đánh giá
    testimonialCardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            boxShadow: "0px 8px 15px rgba(0,0,0,0.1)",
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
      testimonialCardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <main className="relative z-0">
      {/* Banner Chính */}
      <BannerCarousel />

      {/* Phần Khóa Học Nổi Bật */}
      <section
        ref={featuredRef}
        className="fade-in-section py-20 px-6 text-center bg-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          Các kĩ năng trao đổi cùng nhau
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Khám phá các lộ trình học hàng đầu được chọn lọc kỹ lưỡng cho sự phát
          triển của bạn.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => (courseCardRefs.current[index] = el)}
              className="cursor-pointer rounded-lg shadow-md overflow-hidden bg-white border border-gray-200"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phần Danh Mục Phổ Biến */}
      <section ref={categoriesRef} className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Danh Mục Phổ Biến
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {["Phát triển Web", "Khoa học Dữ liệu", "Thiết kế", "Marketing"].map(
            (cat) => (
              <div
                key={cat}
                className="p-6 bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200 transition"
              >
                <h3 className="font-semibold text-lg text-purple-800">{cat}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Phần Cách Thức Hoạt Động */}
      <section
        ref={howItWorksRef}
        className="py-20 px-6 bg-indigo-50 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8">
          Cách Thức Hoạt Động
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map(({ step, title, description }) => (
            <div key={step} className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-indigo-600 font-bold text-3xl mb-4">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phần Đăng Ký Bản Tin */}
      <section
        ref={newsletterRef}
        className="py-16 px-6 bg-gradient-to-b from-violet-600 to-indigo-600 text-white text-center rounded-lg mx-2 "
      >
        <h2 className="text-3xl font-bold mb-4">Cập Nhật Thông Tin</h2>
        <p className="max-w-xl mx-auto mb-8">
          Đăng ký nhận bản tin của chúng tôi để nhận các khóa học và ưu đãi mới
          nhất.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Địa chỉ email của bạn"
            className="p-3 rounded-md text-gray-800 flex-grow bg-white"
          />
          <button
            type="button"
            className="bg-amber-400 hover:bg-amber-500 rounded-md px-6 py-3 font-semibold text-purple-900"
            onClick={() => {
              toast.info("Comming soon...");
            }}
          >
            Đăng Ký
          </button>
        </form>
      </section>
    </main>
  );
};

export default HomePage;
