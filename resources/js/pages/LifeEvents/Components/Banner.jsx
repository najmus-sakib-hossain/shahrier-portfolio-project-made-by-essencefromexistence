const Banner = () => {
  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div className="absolute right-4 hidden lg:block w-[56
      0px]">
        <img src="/assets/life_events/pattern_bg.png" alt="" className="w-full" />
      </div>

      <div className="bg-[#0035F9] rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:justify-between lg:px-20">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 justify-center lg:justify-start mt-24 lg:mt-0">
              <div className="w-16 h-1 bg-white"></div>
              <h4 className="text-2xl lg:text-3xl font-medium text-white">
                My Thoughts
              </h4>
            </div>
            <h1 className="text-3xl lg:text-5xl text-white font-semibold mt-4 leading-relaxed">
              <strong> "Moments that Matter"</strong> – <br />
              <span className="font-light">
                Focusing on meaningful and defining life events.
              </span>
            </h1>
          </div>

          <div className="lg:w-1/2 relative">
            <div>
              <img src="/assets/life_events/life_events_banner.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
