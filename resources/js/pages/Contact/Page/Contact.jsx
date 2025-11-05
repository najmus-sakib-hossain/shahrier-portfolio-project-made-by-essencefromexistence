import Navbar from "../../../components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";

const Contact = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="w-full absolute top-0 left-0 z-50 bg-transparent">
        <Navbar />
      </div>{" "}
      <Banner />
      <Footer />
    </div>
  );
};

export default Contact;
