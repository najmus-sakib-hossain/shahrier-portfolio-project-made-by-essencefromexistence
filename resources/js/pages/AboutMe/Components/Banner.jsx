import { useState } from "react";

const Banner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white w-full mx-auto p-2 lg:p-6">
      <div className="bg-[#0035F9] rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between lg:px-20">
          <div className="lg:px-20 px-5 pt-24 lg:pt-0">
            <div className="mb-6">
              <img
                className="cursor-pointer"
                src="/assets/about_me/video_img.png"
                onClick={() => setIsOpen(true)}
                alt=""
              />
              {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
                  <div className="relative bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-3xl">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-6 text-white cursor-pointer text-2xl z-50"
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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-1 bg-white"></div>
              <p className="text-3xl font-medium text-white">About Me</p>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-white">
              Remarkable lives <br /> respond to a greater <br /> purpose.
            </h1>
          </div>

          <div>
            <div>
              <img src="/assets/about_me/about_me_banner.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
