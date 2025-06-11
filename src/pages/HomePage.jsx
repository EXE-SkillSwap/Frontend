import React, { useRef, useEffect } from "react";
import BannerCarousel from "@/components/common/BannerCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Anh",
    quote:
      "Nền tảng này đã giúp tôi có được công việc mơ ước. Các khóa học được cấu trúc tốt và dễ theo dõi!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    quote:
      "Giảng viên và nội dung tuyệt vời! Tôi đặc biệt thích các dự án tương tác.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 3,
    name: "Lê Thị Hương",
    quote:
      "Trải nghiệm học tập tuyệt vời. Rất khuyến khích cho bất kỳ ai muốn nâng cao kỹ năng.",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
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
          Khóa Học Nổi Bật
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

      {/* Phần Giới Thiệu Giảng Viên */}
      <section ref={instructorsRef} className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
          Gặp Gỡ Giảng Viên Của Chúng Tôi
        </h2>
        <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Nguyễn Thị Hương",
              bio: "Chuyên gia Phát triển Web với 10 năm kinh nghiệm.",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Trần Văn Đức",
              bio: "Nhà khoa học Dữ liệu đam mê biến dữ liệu thành thông tin chi tiết.",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
            },
            {
              name: "Phạm Thị Lan",
              bio: "Nhà thiết kế sáng tạo chuyên về trải nghiệm UI/UX.",
              img: "https://randomuser.me/api/portraits/women/47.jpg",
            },
          ].map(({ name, bio, img }) => (
            <div key={name} className="max-w-xs rounded-lg shadow-lg p-6">
              <img
                src={img}
                alt={name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-600">{bio}</p>
            </div>
          ))}
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
          {[
            {
              step: 1,
              title: "Chọn Khóa Học",
              description: "Duyệt và chọn chủ đề yêu thích của bạn.",
            },
            {
              step: 2,
              title: "Học Theo Tốc Độ Của Bạn",
              description: "Xem video và hoàn thành bài tập.",
            },
            {
              step: 3,
              title: "Nhận Chứng Chỉ",
              description: "Trưng bày thành tích của bạn cho nhà tuyển dụng.",
            },
          ].map(({ step, title, description }) => (
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

      {/* Phần Đánh Giá */}
      <section
        ref={testimonialRef}
        className="fade-in-section bg-gray-100 py-20 px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          Học Viên Nói Gì Về Chúng Tôi
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Lắng nghe từ người học đã đạt được nhiều thành tựu thông qua nền tảng
          của chúng tôi.
        </p>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              ref={(el) => (testimonialCardRefs.current[index] = el)}
              className="bg-white rounded-lg p-6 shadow-md cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <h3 className="font-semibold text-lg">{t.name}</h3>
              </div>
              <p className="text-gray-700 italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phần Đăng Ký Bản Tin */}
      <section
        ref={newsletterRef}
        className="py-16 px-6 bg-purple-700 text-white text-center rounded-t-lg"
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
            className="p-3 rounded-md text-gray-800 flex-grow"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 rounded-md px-6 py-3 font-semibold text-purple-900"
          >
            Đăng Ký
          </button>
        </form>
      </section>
    </main>
  );
};

export default HomePage;
