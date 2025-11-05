import Activities from "../Components/Activities";
import AllEvents from "../Components/AllEvents";
import Banner from "../Components/Banner";
import Navbar from "@/components/Navbar";

const Events = ({ upcomingEvents, pastEvents, featuredEvents }) => {
  return (
    <div>
      <Navbar />
      <Banner featuredEvents={featuredEvents} />
      <Activities upcomingEvents={upcomingEvents} />
      <AllEvents pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
    </div>
  );
};

export default Events;
