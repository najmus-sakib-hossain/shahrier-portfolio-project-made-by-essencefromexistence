import Banner from "../Components/Banner";
import AllVideos from "../Components/AllVideos";
import ShortVideos from "../Components/ShortVideos";
import Navbar from "@/components/Navbar";

const Videos = ({ videos, shortVideos }) => {
  return (
    <div>
      <Navbar />
      <Banner videos={videos} />
      <AllVideos videos={videos} />
      <ShortVideos videos={shortVideos} />
    </div>
  );
};

export default Videos;
