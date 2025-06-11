import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BannerIllustration from "@/components/common/illustration/BannerIllustration";
import gsap from "gsap";

export default function BannerCarousel() {
  const banners = [
    {
      id: 1,
      title: "Kết nối – Học hỏi – Cùng phát triển",
      description:
        "Skill Swap là nơi bạn gặp gỡ những người có cùng đam mê, cùng nhau chia sẻ kỹ năng và học hỏi không giới hạn.",
      buttonText: "Tham gia ngay",
      buttonLink: "#",
      secondaryText: "xem cách hoạt động",
      bgColor: "bg-pink-600 text-white",
      buttonBg: "bg-pink-500 hover:bg-pink-600",
      buttonTextColor: "text-white",
      descriptionTextColor: "text-white/80",
      secondaryTextColor: "text-white/80",
    },
    {
      id: 2,
      title: "Biết gì dạy đó – Cần gì học đó",
      description:
        "Bạn giỏi thiết kế? Bạn muốn học chơi guitar? Trao đổi kỹ năng một cách vui vẻ, dễ dàng và hoàn toàn miễn phí!",
      buttonText: "Bắt đầu trao đổi",
      buttonLink: "#",
      secondaryText: "khám phá kỹ năng",
      bgColor: "bg-yellow-500 text-black",
      buttonBg: "bg-yellow-400 hover:bg-yellow-500",
      buttonTextColor: "text-black",
      descriptionTextColor: "text-black/70",
      secondaryTextColor: "text-black/70",
    },
    {
      id: 3,
      title: "Không ai giỏi hết – Nhưng ai cũng có cái hay",
      description:
        "Mỗi người đều có kỹ năng đáng giá. Skill Swap giúp bạn chia sẻ và học hỏi từ chính cộng đồng thân thiện và năng động này.",
      buttonText: "Khám phá cộng đồng",
      buttonLink: "#",
      secondaryText: "xem trải nghiệm",
      bgColor: "bg-indigo-700 text-white",
      buttonBg: "bg-indigo-600 hover:bg-indigo-700",
      buttonTextColor: "text-white",
      descriptionTextColor: "text-white/80",
      secondaryTextColor: "text-white/80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const contentRef = useRef([]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Animate current banner content
  useEffect(() => {
    const currentContent = contentRef.current[currentIndex];
    if (currentContent) {
      gsap.fromTo(
        currentContent.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );
    }
  }, [currentIndex]);

  return (
    <div
      className="relative w-full overflow-hidden shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-96 md:h-screen max-h-[600px] w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
              banner.bgColor
            )}
          >
            <div className="flex flex-col md:flex-row h-full">
              <div
                ref={(el) => (contentRef.current[index] = el)}
                className="md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {banner.title}
                </h2>
                <p
                  className={cn(
                    "text-sm md:text-base mb-8 max-w-md",
                    banner.descriptionTextColor
                  )}
                >
                  {banner.description}
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    className={cn(
                      "px-8 py-2 rounded-full",
                      banner.buttonBg,
                      banner.buttonTextColor
                    )}
                  >
                    {banner.buttonText}
                  </Button>
                  <span
                    className={cn(
                      "text-sm flex items-center",
                      banner.secondaryTextColor
                    )}
                  >
                    {banner.secondaryText}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
              <BannerIllustration />
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:bg-gray-100 text-gray-800 rounded-full h-10 w-10"
        onClick={prevSlide}
        aria-label="Slide trước"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:bg-gray-100 text-gray-800 rounded-full h-10 w-10"
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Điểm chuyển trang */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-gray-800"
                : "bg-gray-400 hover:bg-gray-600"
            )}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
