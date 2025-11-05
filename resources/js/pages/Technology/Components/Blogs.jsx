import { useState } from "react";

const Blogs = () => {
  const images = [
    { img: "/assets/blogs/img6.png", title: "The Future of AI in Bangladeshi Businesses" },
    { img: "/assets/blogs/img2.png", title: "Cybersecurity Best Practices for SMEs" },
    { img: "/assets/blogs/img3.png", title: "Digital Transformation Strategies" },
    { img: "/assets/blogs/img4.png", title: "Cloud Computing Trends in 2024" },
    { img: "/assets/blogs/img5.png", title: "Building Scalable Tech Startups" },
    { img: "/assets/blogs/img6.png", title: "The Impact of 5G on Business Innovation" },
    { img: "/assets/blogs/img7.png", title: "Data Analytics for Competitive Advantage" },
    { img: "/assets/blogs/img8.png", title: "Sustainable Technology Solutions" },
    { img: "/assets/blogs/img9.png", title: "Blockchain Applications in Finance" },
    { img: "/assets/blogs/img10.png", title: "UX Design Principles for Tech Products" },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const isAllVisible = visibleCount === images.length;

  return (
    <div className="bg-white py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-slate-900 font-semibold">All Blog</h1>
          <button
            onClick={() => setVisibleCount(isAllVisible ? 4 : images.length)}
            className="bg-[#0035F9] text-white font-semibold px-4 py-2 border-none rounded-md transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white active:scale-95 focus:ring-2 focus:ring-slate-500"
          >
            {isAllVisible ? "Show Less" : "All Blogs"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {images.slice(0, visibleCount).map((image, index) => (
            <div key={index}>
              <div className="w-full">
                <img className="rounded-t-2xl w-full" src={image.img} alt="" />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  {image.title}
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>20 Aug 2023</p>
                  <p>10 Min Read</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
