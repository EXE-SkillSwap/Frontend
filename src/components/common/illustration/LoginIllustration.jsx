import React from "react";

const LoginIllustration = () => {
  return (
    <div>
      {/* SVG Illustration - You could replace this with your own illustration */}
      <svg
        className="w-full"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background shape */}
        <circle cx="250" cy="250" r="200" fill="#EEF2FF" />

        {/* Abstract laptop/device */}
        <rect x="150" y="180" width="200" height="140" rx="8" fill="#6366F1" />
        <rect x="160" y="190" width="180" height="110" rx="4" fill="#F9FAFB" />

        {/* Abstract person */}
        <circle cx="250" cy="120" r="35" fill="#818CF8" />
        <path
          d="M200 250 Q250 180 300 250"
          stroke="#818CF8"
          strokeWidth="12"
          fill="none"
        />

        {/* Abstract data/skill elements */}
        <circle cx="180" cy="350" r="15" fill="#6366F1" opacity="0.7" />
        <circle cx="220" cy="370" r="10" fill="#818CF8" opacity="0.5" />
        <circle cx="270" cy="380" r="20" fill="#6366F1" opacity="0.6" />
        <circle cx="320" cy="350" r="12" fill="#818CF8" opacity="0.8" />

        {/* Connection lines */}
        <path d="M190 345 L215 365" stroke="#6366F1" strokeWidth="2" />
        <path d="M230 370 L255 375" stroke="#6366F1" strokeWidth="2" />
        <path d="M285 375 L315 355" stroke="#6366F1" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default LoginIllustration;
