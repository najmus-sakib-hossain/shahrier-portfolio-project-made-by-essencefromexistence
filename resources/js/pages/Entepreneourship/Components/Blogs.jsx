import { useState } from "react";

const Blogs = ({ blogs = [] }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  // Default blogs if none provided
  const defaultBlogs = Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    featured_image: `/assets/blogs/img${index + 1}.png`,
    title: "7 Tips for Custom Enterprise Software Development in 2023",
    publish_date: "2023-08-20",
    read_time: 10
  }));

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;
  const isAllVisible = visibleCount === displayBlogs.length;

  return (
    <div className="bg-white py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-slate-900 font-semibold">All Blog</h1>
          <button
            onClick={() => setVisibleCount(isAllVisible ? 4 : displayBlogs.length)}
            className="bg-[#0035F9] text-white font-semibold px-4 py-2 border-none rounded-md transition duration-300 ease-in-out hover:bg-slate-900 hover:text-white active:scale-95 focus:ring-2 focus:ring-slate-500"
          >
            {isAllVisible ? "Show Less" : "All Blogs"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {displayBlogs.slice(0, visibleCount).map((blog) => (
            <div key={blog.id}>
              <div className="w-full">
                <img 
                  className="rounded-t-2xl w-full h-48 object-cover" 
                  src={blog.featured_image || blog.image || "/assets/blogs/default.png"} 
                  alt={blog.title} 
                />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>
                    {blog.publish_date 
                      ? new Date(blog.publish_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      : '20 Aug 2023'}
                  </p>
                  <p>{blog.read_time || 10} Min Read</p>
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
