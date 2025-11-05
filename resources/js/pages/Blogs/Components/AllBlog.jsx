import { Search } from "lucide-react";
import { useState } from "react";

const AllBlog = ({ blogs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="flex items-center justify-between py-12">
        <h1 className="text-4xl font-semibold text-slate-950">All Blogs</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md shadow-md"
          />

          <div className="absolute top-3 left-4 text-lg">
            <Search className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {filteredBlogs.map((blog) => (
          <div key={blog.id}>
            <div>
              <div className="w-full">
                <img 
                  className="rounded-t-2xl w-full h-48 object-cover" 
                  src={blog.featured_image || '/assets/blogs/default.png'} 
                  alt={blog.title} 
                />
              </div>

              <div className="p-4">
                <h1 className="text-xl font-semibold text-slate-950 mb-4">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-8 text-gray-600">
                  <p>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</p>
                  <p>{blog.read_time} Min Read</p>
                </div>

                {blog.category && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
        </div>
      )}
    </div>
  );
};

export default AllBlog;
