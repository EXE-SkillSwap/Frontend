import React from "react";

const ChaseLoading = () => {
  const sharedStyle = {
    content: "",
    width: "100%",
    height: "100%",
    display: "block",
    border: "5.6px solid #9747ff",
    borderRadius: "50%",
    boxShadow: "0 -33.6px 0 -5.6px #9747ff",
    position: "absolute",
    animation: "spinner-rotate 1.25s infinite ease",
  };
  return (
    <div className="relative w-[22.4px] h-[22.4px]">
      <div
        style={{
          ...sharedStyle,
          animation:
            "spinner-b4c8mmmd 0.5s backwards, spinner-rotate 1.25s 0.5s infinite ease",
        }}
      ></div>
      <div
        style={{
          ...sharedStyle,
          animationDelay: "0s, 1.25s",
        }}
      ></div>
      <style>
        {`
          @keyframes spinner-b4c8mmmd {
            from {
              box-shadow: 0 0 0 -5.6px #9747ff;
            }
          }

          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChaseLoading;
