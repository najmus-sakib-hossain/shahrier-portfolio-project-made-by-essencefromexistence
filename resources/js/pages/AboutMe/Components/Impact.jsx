const Impact = () => {
  const allImpact = [
    "Innovation and Product Development",
    "Research and Development (R&D)",
    "Cybersecurity and Data Protection",
    "Optimization of Processes",
    "Leadership in Digital Transformation",
    "User Experience (UX) Design",
    "Education and Mentorship",
    "Ethical and Social Contributions",
  ];

  return (
    <div
      className="py-10 w-full mx-auto"
      style={{
        backgroundImage: `url(/assets/about_me/corporate_journey.png)`,

        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 mb-20">
        <div className="lg:col-span-1">
          <div className="overflow-hidden w-[460px] h-[332px]">
            <img
              src="/assets/about_me/shahriar_khan4.png"
              alt=""
              className="transition-transform duration-500 ease-in-out hover:scale-105  w-full h-full object-cover"
            />
          </div>

          <div className="-translate-y-28 transition-transform duration-500 hover:rotate-6 w-[460px] h-[332px]">
            <img
              src="/assets/about_me/shahriar_khan3.png"
              alt=""
              className="transition-transform duration-500 hover:scale-110 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col items-center justify-center">
          <h1 className="text-white font-semibold text-4xl lg:text-6xl mb-6">
            Entrepreneur Impact
          </h1>
          <p className="font-light text-gray-300 text-lg text-center">
            As a visionary entrepreneur, Shahriar Khan has pioneered multiple successful ventures including Nexkraft LTD, Nexfly, Mechanix, and NexAcademy. His leadership has driven innovation in event planning, education technology, and digital solutions, creating jobs and fostering economic growth in Bangladesh and beyond.
          </p>
        </div>

        <div className="lg:col-span-1 ml-20">
          <div className="overflow-hidden w-[460px] h-[332px]">
            <img
              src="/assets/about_me/shahriar_khan2.png"
              alt=""
              className="transition-transform duration-500 ease-in-out hover:scale-105 w-full h-full object-cover"
            />
          </div>

          <div className="-translate-y-28 transition-transform duration-500 hover:-rotate-6 w-[460px] h-[332px]">
            <img
              src="/assets/about_me/shahriar_khan1.png"
              alt=""
              className="transition-transform duration-500 hover:scale-110 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto lg:w-9/12 lg:ml-[20%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-1">
            <h1 className="text-4xl lg:text-6xl font-semibold text-white mb-6">
              Technology Impact
            </h1>

            <p className="text-gray-300">
              Shahriar Khan has been at the forefront of technological advancement, specializing in AI-driven solutions, cloud-based systems, and cybersecurity. His expertise spans research and development, user experience design, and digital transformation strategies that have revolutionized how businesses operate in the modern digital landscape.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {allImpact.map((impact, index) => (
                <div key={index}>
                  <div className="bg-slate-900 py-8 px-4 rounded-xl">
                    <p className="text-white text-center">{impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
