import { useState } from "react";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-between px-8 lg:px-32">
      {/* Left Section with Video */}
      <div className="relative w-1/2">
        <img
          src="your-video-thumbnail.jpg"
          alt="Video Thumbnail"
          className="w-full rounded-lg object-cover"
        />
        <button
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center hover:bg-opacity-75 transition"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-8 w-8 text-black transition ${
                isHovered ? "scale-110" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-4.596-2.65A1 1 0 009 9.367v5.267a1 1 0 001.156.986l4.596-2.65a1 1 0 000-1.732z"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Right Section with Text */}
      <div className="w-1/2 flex flex-col items-start justify-center">
        <h1 className="text-5xl font-bold leading-tight">
          Extraordinary lives <br /> answer to a higher <br /> calling
        </h1>
        <p className="mt-4 text-lg opacity-75">ABOUT TONY</p>
      </div>
    </div>
  );
};

export default HeroSection;
