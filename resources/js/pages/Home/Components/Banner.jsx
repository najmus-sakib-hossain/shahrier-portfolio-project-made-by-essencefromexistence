import { useState, useEffect } from "react";

const Banner = ({ hero, statistics }) => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 2000);
    }
  }, []);

  return (
    <div className="w-full mx-auto h-screen relative">
      {showSplash && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50 transition-opacity duration-1000">
          <h1 className="text-5xl font-bold text-black animate-bounce special-text">
            {hero?.title || "Shahriar Khan"}
          </h1>
        </div>
      )}

      {!showSplash && (<>
        <div className="w-full relative flex">
          <div className="w-2/3 h-full ">
            <div className="h-[500px] md:h-[600px] lg:h-[800px] relative">
              <img
                src={hero?.image_url || "/assets/home_banner.png"}
                alt="Home Banner"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 w-full h-full flex items-end justify-start text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 41.23%, #000 99.94%)",
                }}
              >
                <p className="text-4xl lg:text-6xl font-semibold p-5 lg:p-20">
                  {hero?.subtitle || "Embrace the extraordinary. Live your fullest life."}
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/3 h-[500px] md:h-[600px] lg:h-[800px] flex flex-col justify-center">
            <div className="flex items-center gap-4 px-5 lg:px-20 mb-6 lg:mt-48">
              <p className="text-3xl font-medium text-slate-900">
                {hero?.tagline || "Entrepreneur"}
              </p>
              <div className="w-20 h-1 bg-slate-900"></div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-semibold text-slate-900 px-5 lg:px-20">
              {hero?.description || "Connecting brands & people through experiences."}
            </h1>
          </div>
        </div>

        <div className="w-full flex min-h-48 ">
          <div className="w-2/3 py-6 bg-[#3b3939d3] bg-opacity-10 backdrop-blur-sm min-h-full">
            <div className="w-11/12 mx-auto h-full flex items-center justify-center">
              <div className="h-full grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-auto">
                {statistics && statistics.filter((stat, index, self) => self.findIndex(s => s.label === stat.label) === index).map((stat) => (
                  <div className="flex flex-col items-center justify-center" key={stat.id}>
                    <h1 className="text-white font-semibold text-2xl mb-3 text-center">
                      {stat.value}
                    </h1>
                    <p className="text-lg text-slate-300 text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="py-[46px] bg-slate-900 min-h-full w-1/3">
            <div className="h-full flex items-center justify-center gap-6 flex-wrap px-4">
              <h1 className="text-lg font-bold text-white">Social Media:</h1>
              {hero?.social_links?.linkedin && (
                <a
                  href={hero.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/home/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  <span className="text-lg text-white font-normal">LinkedIn</span>
                </a>
              )}

              {hero?.social_links?.dribbble && (
                <a
                  href={hero.social_links.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/home/dribble.svg" alt="Dribbble" className="w-5 h-5" />
                  <span className="text-lg text-white font-normal">Dribbble</span>
                </a>
              )}

              {hero?.social_links?.behance && (
                <a
                  href={hero.social_links.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/home/behance.svg" alt="Behance" className="w-5 h-5" />
                  <span className="text-lg text-white font-normal">Behance</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default Banner;
