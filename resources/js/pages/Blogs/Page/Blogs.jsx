import AllBlog from "../Components/AllBlog";
import Banner from "../Components/Banner";
import Navbar from "@/components/Navbar";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AllBlog blogs={blogs} />
    </div>
  );
};

export default Blogs;
