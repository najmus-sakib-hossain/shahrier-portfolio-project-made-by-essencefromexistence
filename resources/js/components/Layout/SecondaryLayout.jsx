import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const SecondaryLayout = () => {
  return (
    <div>
      <div className="relative">
        <div className="w-full absolute top-4 left-0 z-50 bg-transparent">
          <Navbar />
        </div>{" "}
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default SecondaryLayout;
