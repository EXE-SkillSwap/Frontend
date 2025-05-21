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
      title: "Learn anywhere",
      description:
        "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      buttonText: "Get started",
      buttonLink: "#",
      secondaryText: "or contact",
      bgColor: "bg-purple-700 text-white",
      buttonBg: "bg-purple-600 hover:bg-purple-700",
      buttonTextColor: "text-white",
      descriptionTextColor: "text-gray-300",
      secondaryTextColor: "text-gray-300",
    },
    {
      id: 2,
      title: "Learn together",
      description:
        "Connect with peers and instructors in our collaborative learning environment designed for student success.",
      buttonText: "Join a class",
      buttonLink: "#",
      secondaryText: "view courses",
      bgColor: "bg-purple-900 text-white",
      buttonBg: "bg-purple-800 hover:bg-purple-900",
      buttonTextColor: "text-white",
      descriptionTextColor: "text-gray-300",
      secondaryTextColor: "text-gray-300",
    },
    {
      id: 3,
      title: "Learn at your pace",
      description:
        "Access course materials anytime, anywhere. Set your own schedule and learn at the pace that works for you.",
      buttonText: "Explore options",
      buttonLink: "#",
      secondaryText: "learn more",
      bgColor: "bg-indigo-900 text-white",
      buttonBg: "bg-indigo-800 hover:bg-indigo-900",
      buttonTextColor: "text-white",
      descriptionTextColor: "text-gray-300",
      secondaryTextColor: "text-gray-300",
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

      {/* Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:bg-gray-100 text-gray-800 rounded-full h-10 w-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md hover:bg-gray-100 text-gray-800 rounded-full h-10 w-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Pagination */}
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
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}