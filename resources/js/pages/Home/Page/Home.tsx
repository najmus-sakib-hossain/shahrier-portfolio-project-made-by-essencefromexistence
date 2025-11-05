import Navbar from "@/components/Navbar";
import Banner from "../Components/Banner";

const Home = ({ hero, statistics }) => {
  return (
    <div className="relative flex flex-col">
      <div className="w-full absolute top-0 left-0 z-50 bg-transparent">
        <Navbar />
      </div>{" "}
      <Banner hero={hero} statistics={statistics} />
    </div>
  );
};

export default Home;