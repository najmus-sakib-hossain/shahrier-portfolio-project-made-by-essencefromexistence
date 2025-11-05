import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import InfiniteSlider from "../Components/InfiniteSlider";

const Mainlayout = () => {
  return (
    <div>
      <div className="relative">
        <div className="w-full absolute top-4 left-0 z-50 bg-transparent">
          <Navbar />
        </div>{" "}
        <Outlet />
      </div>
      <div>
        <InfiniteSlider />
      </div>
      <Footer />
    </div>
  );
};

export default Mainlayout;
