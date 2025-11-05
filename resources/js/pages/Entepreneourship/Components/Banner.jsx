const Banner = () => {
  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div className="relative flex flex-col lg:flex-row h-auto lg:h-[700px] rounded-3xl overflow-hidden">
        {/* Left Side - Dark Background */}
        <div className="w-full lg:w-1/2 h-auto lg:h-full bg-[#111827] flex items-center justify-center p-6 lg:p-8 text-white">
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="flex items-center gap-4 justify-center lg:justify-start mt-24 lg:mt-0">
              <div className="w-16 h-1 bg-white"></div>
              <h4 className="text-2xl lg:text-3xl font-medium">My Thoughts</h4>
            </div>
            <h1 className="text-3xl lg:text-5xl font-semibold mt-4 leading-relaxed">
              "We are now in the era of the 4th industrial revolution, where
              everything depends on technology. So we also have to depend on
              technology"
            </h1>
          </div>
        </div>

        {/* Right Side - Image with Gradient Overlay */}
        <div
          className="w-full lg:w-1/2 h-[300px] lg:h-full bg-cover bg-right"
          style={{
            backgroundImage: `linear-gradient(to left, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.3), rgba(0, 0, 0, 0)), url(/assets/entepreneourship/shahriar_khan_banner.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
