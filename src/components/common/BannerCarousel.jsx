import BannerIllustration from "@/components/common/illustration/BannerIllustration";
import { Button } from "@/components/ui/button";
import { banners } from "@/data/banner";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const contentRef = useRef([]);
  const illusRef = useRef([]);
  const imgRef = useRef([]);

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
          stagger: 0.18,
          ease: "power3.out",
        }
      );
    }
    // Parallax effect for illustration
    const illus = illusRef.current[currentIndex];
    if (illus) {
      gsap.fromTo(
        illus,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
    // Parallax effect for image
    const img = imgRef.current[currentIndex];
    if (img) {
      gsap.fromTo(
        img,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  return (
    <div
      className="relative w-full overflow-hidden shadow-2xl rounded-b-3xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[420px] md:h-[520px] lg:h-[600px] w-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex flex-col md:flex-row items-stretch",
              index === currentIndex
                ? "opacity-100 z-10 translate-x-0 pointer-events-auto"
                : index < currentIndex
                ? "opacity-0 z-0 -translate-x-20 pointer-events-none"
                : "opacity-0 z-0 translate-x-20 pointer-events-none",
              banner.bgColor
            )}
            style={{
              boxShadow:
                index === currentIndex
                  ? "0 8px 32px 0 rgba(80,0,120,0.12)"
                  : undefined,
            }}
          >
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-0" />
            <div
              ref={(el) => (contentRef.current[index] = el)}
              className="relative z-10 md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 py-10 md:py-0"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
                {banner.title}
              </h2>
              <p
                className={cn(
                  "text-base md:text-lg mb-8 max-w-xl font-medium animate-fade-in",
                  banner.descriptionTextColor
                )}
              >
                {banner.description}
              </p>
              <div className="flex items-center gap-4 animate-fade-in">
                <Button
                  className={cn(
                    "px-8 py-2 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-white/10",
                    banner.buttonBg,
                    banner.buttonTextColor
                  )}
                >
                  {banner.buttonText}
                </Button>
                <span
                  className={cn(
                    "text-sm flex items-center cursor-pointer hover:underline hover:scale-105 transition-all duration-200",
                    banner.secondaryTextColor
                  )}
                >
                  {banner.secondaryText}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
            <div className="relative z-10 flex-1 flex items-center justify-center md:justify-end pr-0 md:pr-12">
              {banner.image ? (
                <div
                  ref={(el) => (imgRef.current[index] = el)}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 flex items-center justify-center relative group"
                >
                  <img
                    src={banner.image}
                    alt="Banner minh họa"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              ) : (
                <div ref={(el) => (illusRef.current[index] = el)}>
                  <BannerIllustration />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Nút điều hướng */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-xl hover:bg-purple-100 text-purple-700 border-2 border-purple-200 rounded-full h-14 w-14 scale-100 hover:scale-110 transition-all duration-200"
        onClick={prevSlide}
        aria-label="Slide trước"
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 shadow-xl hover:bg-purple-100 text-purple-700 border-2 border-purple-200 rounded-full h-14 w-14 scale-100 hover:scale-110 transition-all duration-200"
        onClick={nextSlide}
        aria-label="Slide tiếp theo"
      >
        <ChevronRight className="h-7 w-7" />
      </Button>
      {/* Điểm chuyển trang */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/40 shadow-md",
              index === currentIndex
                ? "scale-125 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-lg"
                : "bg-white/60 hover:bg-purple-200"
            )}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
