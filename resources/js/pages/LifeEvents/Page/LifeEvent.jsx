import Banner from "../Components/Banner";
import Category from "../Components/Category";
import Navbar from "@/components/Navbar";

const LifeEvent = ({ lifeEvents, categories }) => {
  return (
    <div>
      <Navbar />
      <Banner lifeEvents={lifeEvents} />
      <Category lifeEvents={lifeEvents} categories={categories} />
    </div>
  );
};

export default LifeEvent;
