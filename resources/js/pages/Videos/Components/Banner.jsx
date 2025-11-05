import { useState } from "react";

const Banner = ({ videos = [] }) => {
  // Default videos if none provided
  const defaultVideos = [
    {
      id: 1,
      title: "Transplant gives patient a second chance",
      thumbnail: "/assets/videos/video_thumbline.png"
    },
    {
      id: 2,
      title: "A new hope for patients in need",
      thumbnail: "/assets/videos/video_thumbline.png"
    },
    {
      id: 3,
      title: "The future of medical innovations",
      thumbnail: "/assets/videos/video_thumbline.png"
    },
  ];

  const displayVideos = videos.length > 0 ? videos.slice(0, 3) : defaultVideos;

  return (
    <div className="bg-slate-100 py-18 relative">
      <div className="absolute top-0 right-0 hidden lg:block">
        <div>
          <img src="/assets/videos/vector_right.svg" alt="" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 hidden lg:block">
        <div>
          <img src="/assets/videos/vector_left.svg" alt="" />
        </div>
      </div>
      <div className="w-11/12 lg:w-9/12 mx-auto mt-24">
        <h1 className="text-5xl text-slate-900 font-semibold mb-12">Videos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-x-8 gap-y-6">
          {displayVideos.length > 0 && (
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="w-full h-full relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={displayVideos[0].thumbnail || "/assets/videos/video_thumbline.png"}
                  alt={displayVideos[0].title}
                />
                <div className="flex items-center gap-2 absolute bottom-10 left-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <img src="/assets/videos/play-fill.svg" alt="Play" className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-semibold text-white hidden lg:block">
                    {displayVideos[0].title}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {displayVideos.slice(1).map((video) => (
            <div key={video.id} className="lg:col-span-1 lg:row-span-1">
              <div className="w-full h-full relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                  alt={video.title}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <img src="/assets/videos/play-fill.svg" alt="Play" className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
