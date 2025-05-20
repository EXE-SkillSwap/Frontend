import React from "react";

const BannerIllustration = () => {
  return (
    <>
      {/* Right column - Geometric shapes illustration */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-8 relative overflow-hidden">
        {/* Main circular element */}
        <div className="relative">
          {/* Large backdrop circle */}
          <div className="absolute h-64 w-64 rounded-full bg-blue-100 opacity-70 -top-6 -left-6"></div>

          {/* Person illustration container */}
          <div className="relative z-10 h-56 w-56 bg-blue-400 rounded-full flex items-center justify-center">
            {/* Head */}
            <div className="absolute top-4 h-20 w-16 bg-blue-200 rounded-full"></div>

            {/* Body */}
            <div className="absolute top-20 h-28 w-24 bg-blue-200 rounded-t-2xl"></div>

            {/* Idea lightbulb */}
            <div className="absolute -top-4 left-20 flex flex-col items-center">
              <div className="h-8 w-8 bg-amber-300 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-amber-100"></div>
              </div>
              {/* Light rays */}
              <div className="absolute -top-4 -left-4 h-2 w-2 bg-transparent border-t-2 border-l-2 border-amber-300 transform rotate-45"></div>
              <div className="absolute -top-4 left-10 h-2 w-2 bg-transparent border-t-2 border-r-2 border-amber-300 transform rotate-45"></div>
              <div className="absolute -top-1 -left-6 h-2 w-2 bg-transparent border-t-2 border-l-2 border-amber-300 transform rotate-45"></div>
            </div>
          </div>

          {/* Laptop element */}
          <div className="absolute bottom-0 left-10 h-16 w-24 bg-navy-800 rounded-t-md"></div>
          <div className="absolute bottom-16 left-8 h-12 w-28 bg-gray-200 rounded-t-md transform -rotate-6"></div>

          {/* Floating elements */}
          <div className="absolute top-10 right-2 h-16 w-20 bg-white rounded-lg flex items-center justify-center">
            <div className="h-8 w-12 bg-gray-200"></div>
          </div>

          <div className="absolute top-32 -right-8 h-12 w-12 bg-white rounded-lg flex items-center justify-center">
            <div className="h-6 w-6 bg-gray-200"></div>
          </div>

          {/* Geometric decoration shapes */}
          <div className="absolute top-4 right-24 h-6 w-6 bg-amber-300 rounded-full"></div>
          <div className="absolute top-24 right-12 h-4 w-4 bg-gray-300 rounded-sm transform rotate-45"></div>
          <div className="absolute bottom-20 right-4 h-4 w-8 bg-indigo-300 rounded-full"></div>
          <div className="absolute top-8 -left-10 h-5 w-5 border-2 border-indigo-400 rounded-sm transform rotate-12"></div>
          <div className="absolute bottom-8 left-40 h-6 w-6 bg-transparent border-2 border-amber-400 rounded-full"></div>
          <div className="absolute bottom-20 left-2 h-4 w-4 bg-emerald-300 transform rotate-12"></div>
        </div>
      </div>
    </>
  );
};

export default BannerIllustration;
