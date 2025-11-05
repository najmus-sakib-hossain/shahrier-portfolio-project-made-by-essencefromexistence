import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronLeft size={24} />
  </div>
);

const ShortVideos = ({ videos = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Default videos if none provided
  const defaultVideos = [
    {
      id: 1,
      thumbnail: "/assets/videos/video_thumbline.png",
      video_url: "https://www.youtube.com/embed/gzzRFU8CcG8?si=N8P-kmSGfbyjp6jB",
    },
    {
      id: 2,
      thumbnail: "/assets/videos/video_thumbline.png",
      video_url: "https://www.youtube.com/embed/gzzRFU8CcG8?si=N8P-kmSGfbyjp6jB",
    },
    {
      id: 3,
      thumbnail: "/assets/videos/video_thumbline.png",
      video_url: "https://www.youtube.com/embed/gzzRFU8CcG8?si=N8P-kmSGfbyjp6jB",
    },
    {
      id: 4,
      thumbnail: "/assets/videos/video_thumbline.png",
      video_url: "https://www.youtube.com/embed/gzzRFU8CcG8?si=N8P-kmSGfbyjp6jB",
    },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  const handlePlayVideo = (id) => {
    setActiveVideo(id);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, displayVideos.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, displayVideos.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h1 className="text-white text-5xl font-semibold mb-12">
          Short Videos
        </h1>

        {displayVideos.length > 0 && (
          <Slider {...settings}>
            {displayVideos.map((video) => (
              <div key={video.id} className="relative w-64 h-[500px] p-4">
                {activeVideo === video.id ? (
                  <div className="relative w-full h-[500px] pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                      src={video.video_url}
                      title={video.title || `YouTube video player for video ${video.id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <>
                    <img
                      src={video.thumbnail || "/assets/videos/video_thumbline.png"}
                      alt={video.title || `Thumbnail for video ${video.id}`}
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />

                    <button
                      onClick={() => handlePlayVideo(video.id)}
                      className="w-16 h-16 bg-[#2E5AFF] shadow-lg absolute top-[40%] left-[35%] flex items-center justify-center text-secondary rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ShortVideos;
