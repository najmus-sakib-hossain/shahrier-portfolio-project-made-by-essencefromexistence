import Banner from "../Components/Banner";
import Blogs from "../Components/Blogs";
import Events from "../Components/Events";
import Innovation from "../Components/Innovation";
import Quotes from "../Components/Quotes";
import Navbar from "@/components/Navbar";

const Entepreneouship = ({ blogs, quotes, events, innovations }) => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Quotes quotes={quotes} />
      <Innovation innovations={innovations} />
      <Events events={events} />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default Entepreneouship;
