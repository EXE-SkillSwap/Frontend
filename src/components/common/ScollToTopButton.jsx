import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 p-3 rounded-full 
        bg-blue-950 text-white shadow-lg
        hover:bg-indigo-900 focus:outline-none
        transition-all duration-300 transform hover:scale-110
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-12 pointer-events-none"
        }
      `}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTopButton;
