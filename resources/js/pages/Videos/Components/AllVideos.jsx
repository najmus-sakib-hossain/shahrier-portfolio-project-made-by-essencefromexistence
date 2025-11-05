import { useState } from "react";

const AllVideos = ({ videos = [] }) => {
  const [visibleVideos, setVisibleVideos] = useState(3);

  // Default data if no videos provided
  const defaultVideos = [
    {
      id: 1,
      title: "Transplant gives patient a second chance",
      thumbnail: "/assets/videos/video_thumbline.png",
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
    {
      id: 4,
      title: "Transplant gives patient a second chance",
      thumbnail: "/assets/videos/video_thumbline.png",
    },
    { 
      id: 5, 
      title: "A new hope for patients in need", 
      thumbnail: "/assets/videos/video_thumbline.png" 
    },
    { 
      id: 6, 
      title: "The future of medical innovations", 
      thumbnail: "/assets/videos/video_thumbline.png" 
    },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  return (
    <div className="py-18 bg-slate-100">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl lg:text-5xl text-slate-900 font-semibold">
            All Videos
          </h1>
          <input
            type="text"
            placeholder="Search For Videos"
            className="rounded-lg text-slate-600 p-4 shadow-lg bg-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {displayVideos.slice(0, visibleVideos).map((video) => (
            <div key={video.id}>
              <div className="w-full h-full relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                  alt={video.title}
                />
                <div className="flex items-center gap-2 absolute bottom-10 left-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <img src="/assets/videos/play-fill.svg" alt="Play" className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white hidden lg:block">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          {visibleVideos < displayVideos.length ? (
            <button
              onClick={() => setVisibleVideos(displayVideos.length)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Load More
            </button>
          ) : displayVideos.length > 3 && (
            <button
              onClick={() => setVisibleVideos(3)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVideos;
