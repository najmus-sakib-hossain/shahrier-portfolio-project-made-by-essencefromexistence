import { useState } from "react";

const BannerExp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div className="bg-[#0035F9] rounded-2xl relative">
        <div className="px-5 pt-24 lg:ml-[10%]">
          {/* Banner Image */}
          <div
            className="hidden lg:block cursor-pointer"
            onClick={() => setIsOpen(true)}
            style={{
              backgroundImage: `url(/assets/about_me/banner_mask.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "800px",
              width: "100%",
            }}
          ></div>

          {/* Text Section */}
          <div className="absolute bottom-16 z-50 hidden lg:block">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-1 bg-white"></div>
              <p className="text-3xl font-medium text-white">About Me</p>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-white">
              Remarkable lives <br /> respond to a greater <br /> purpose.
            </h1>
          </div>
        </div>
      </div>

      {/* Modal (Placed Outside the Banner) */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)} // Clicking outside closes modal
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-3xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-black cursor-pointer text-2xl"
            >
              ✖
            </button>
            <div className="relative w-full h-[80vh]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/UGrFGCf5NWY?si=YCA7UJNOqxa3mvCU"
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerExp;
