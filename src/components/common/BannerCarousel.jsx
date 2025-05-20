import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import BannerIllustration from "@/components/common/illustration/BannerIllustration";

export default function BannerCarousel() {
  // Sample banner data - matching the e-learning style
  const banners = [
    {
      id: 1,
      title: "Learn anywhere",
      description:
        "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
      buttonText: "Get started",
      buttonLink: "#",
      secondaryText: "or contact",
      bgColor: "bg-amber-300",
    },
    {
      id: 2,
      title: "Learn together",
      description:
        "Connect with peers and instructors in our collaborative learning environment designed for student success.",
      buttonText: "Join a class",
      buttonLink: "#",
      secondaryText: "view courses",
      bgColor: "bg-blue-300",
    },
    {
      id: 3,
      title: "Learn at your pace",
      description:
        "Access course materials anytime, anywhere. Set your own schedule and learn at the pace that works for you.",
      buttonText: "Explore options",
      buttonLink: "#",
      secondaryText: "learn more",
      bgColor: "bg-emerald-500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Navigate to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  // Set up autoplay
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Pause autoplay when hovering over carousel
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main carousel container */}
      <div className="relative h-96 md:h-screen max-h-[600px] w-full">
        {/* Banner slides */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
              banner.bgColor
            )}
          >
            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row h-full">
              {/* Left column - Content */}
              <div className="md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-navy-900">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-8 max-w-md">
                  {banner.description}
                </p>

                <div className="flex items-center gap-4">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-2 rounded-full">
                    {banner.buttonText}
                  </Button>
                  <span className="text-sm text-gray-600 flex items-center">
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

      {/* Navigation arrows - styled to match the modern look */}
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

      {/* Pagination indicators - styled to match the modern look */}
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
