import { useState } from "react";

const Banner = () => {
  return (
    <div className="bg-slate-100 pt-48 pb-16 relative">
      <div className="absolute top-0 right-0 hidden lg:block">
        <img src="/assets/blogs/vector_right.svg" alt="" />
      </div>

      <div className="absolute bottom-0 left-0 hidden lg:block">
        <img src="/assets/blogs/vector_left.svg" alt="" />
      </div>

      <h1 className="text-slate-950 text-5xl font-semibold text-center mb-8">
        Blogs
      </h1>

      <div className="w-11/12 lg:w-9/12 mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:grid-rows-2">
          <div className="lg:col-span-2 lg:row-span-2">
            <div>
              <div>
                <img className="rounded-t-2xl" src="/assets/blogs/img1.png" alt="" />
              </div>

              <div className="p-4 lg:p-8 ">
                <h1 className="text-2xl lg:text-4xl font-semibold text-slate-950 mb-4">
                  Code Warriors Assemble! Bangladesh Prepares for ICT Olympiad
                  Glory.
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:row-span-1">
            <div>
              <div className="w-full">
                <img className="rounded-t-2xl w-full" src="/assets/blogs/img2.png" alt="" />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  Cybersecurity Best Practices for SMEs
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:row-span-1">
            <div>
              <div className="w-full">
                <img className="rounded-t-2xl w-full" src="/assets/blogs/img3.png" alt="" />
              </div>

              <div className="p-4 ">
                <h1 className="text-xl font-semibold text-slate-950 mb-2">
                  Digital Transformation Strategies
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <div>
              <div className="w-full">
                <img className="rounded-t-2xl w-full" src="/assets/blogs/img4.png" alt="" />
              </div>

              <div className="p-4 ">
                <h1 className="text-xl font-semibold text-slate-950 mb-2">
                  Cloud Computing Trends in 2024
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 lg:row-span-1">
            <div>
              <div className="w-full">
                <img className="rounded-t-2xl w-full" src="/assets/blogs/img5.png" alt="" />
              </div>

              <div className="p-4 ">
                <h1 className="text-xl font-semibold text-slate-950 mb-2">
                  Building Scalable Tech Startups
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
