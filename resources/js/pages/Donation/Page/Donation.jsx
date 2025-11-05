import Banner from "../Components/Banner";
import Donate from "../Components/Donate";
import Navbar from "@/components/Navbar";

const Donation = ({ donations }) => {
  return (
    <div>
      <Navbar />
      <Banner donations={donations} />
      <Donate donations={donations} />
    </div>
  );
};

export default Donation;
