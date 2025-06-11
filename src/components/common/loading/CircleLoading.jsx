import React from "react";

const CircleLoading = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-[#3b9df8]"></div>
    </div>
  );
};

export default CircleLoading;
