import React from "react";

const Corporate = () => {
  return (
    <div className="bg-slate-950 py-16">
      <h1 className="text-4xl lg:text-6xl font-semibold text-white lg:ml-[10%] mb-8">
        Corporate Journey
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-1 border border-gray-700">
          <div className="p-8 space-y-6 mb-20">
            <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl">1</p>
            </div>
            <h1 className="text-4xl font-semibold text-white">Graduation</h1>
            <p className="text-2xl text-white">East West University</p>
            <p className="text-lg font-normal text-white">
              Master of Business Administration (M.B.A.), Banking, Corporate,
              Finance, and Securities Law
            </p>
          </div>

          <div>
            <img src="/assets/about_me/graduation_hat.png" alt="" />
          </div>
        </div>

        <div className="lg:col-span-1 border border-gray-700">
          <div className="p-8 space-y-6 mb-20">
            <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl">2</p>
            </div>
            <h1 className="text-4xl font-semibold text-white">First Job</h1>
            <p className="text-2xl text-white">Banking Sector</p>
            <p className="text-lg font-normal text-white">
              Financial Analyst, Corporate Banking Division (2008-2011)
            </p>
          </div>

          <div>
            <img src="/assets/about_me/search.png" alt="" />
          </div>
        </div>

        <div className="lg:col-span-1 border border-gray-700">
          <div className="p-8 space-y-6 mb-20">
            <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl">3</p>
            </div>
            <h1 className="text-4xl font-semibold text-white">Last Job</h1>
            <p className="text-2xl text-white">Technology Consulting Firm</p>
            <p className="text-lg font-normal text-white">Senior Consultant, Digital Solutions (2010-2011)</p>
          </div>

          <div>
            <img src="/assets/about_me/rotate_bag.png" alt="" />
          </div>
        </div>

        <div className="lg:col-span-1 border border-gray-700">
          <div className="p-8 space-y-6 mb-20">
            <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl">4</p>
            </div>
            <h1 className="text-4xl font-semibold text-white">Enterpreneur</h1>
            <p className="text-2xl text-white">Nexkraft LTD</p>
            <p className="text-lg font-normal text-white">Founder & CEO (2011-Present)</p>
          </div>

          <div className="mb-4">
            <img src="/assets/about_me/bag.svg" alt="" />
          </div>
        </div>

        <div className="lg:col-span-1 border border-gray-700">
          <div className="p-8 space-y-6 mb-20">
            <div className="rounded-full border-4 border-gray-500 w-12 h-12 flex items-center justify-center">
              <p className="text-gray-500 text-xl">5</p>
            </div>
            <h1 className="text-4xl font-semibold text-white">
              Nexkraft launching
            </h1>
            <p className="text-2xl text-white">Nexkraft LTD</p>
            <p className="text-lg font-normal text-white">CEO (2011)</p>
          </div>

          <div className="mb-4">
            <img src="/assets/about_me/nexkraft.svg" alt="" />
          </div>
        </div>
      </div>

      <div
        className="w-full mx-auto"
        style={{
          backgroundImage: ` url(/assets/about_me/corporate_journey.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-11/12 lg:w-9/12 mx-auto py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-50">
            <div className="lg:pt-48">
              <h3 className="text-3xl font-semibold text-white mb-6">
                Logic Theory
              </h3>

              <p className="text-white mb-6">
                Innovation drives progress. By combining cutting-edge technology with strategic business insights, we can solve complex problems and create sustainable value for our clients and communities.
              </p>
              <p className="text-white mb-6">
                Collaboration and continuous learning are essential. Building strong partnerships and staying ahead of technological trends ensures long-term success in the rapidly evolving digital landscape.
              </p>
            </div>

            <div className="w-fit h-fit">
              <img
                className="w-fit h-fit rounded-b-full"
                src="/assets/about_me/shahriar_khan_philosophy.png"
                alt=""
              />
            </div>

            <div>
              <h1 className="text-5xl lg:text-7xl font-semibold text-white mb-6 lg:mb-48">
                My Philosophy
              </h1>

              <p className="text-3xl font-semibold text-white mb-6">Logic #1</p>
              <p className="text-white mb-6">
                Technology should serve humanity. Every innovation we develop is guided by the principle of creating positive impact and ethical advancement in our society.
              </p>
            </div>
          </div>
          <div className="absolute top-64 right-10 z-20 hidden lg:block">
            <img src="/assets/about_me/line.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
