import Banner from "../Components/Banner";
import Blogs from "../Components/Blogs";
import Certificates from "../Components/Certificates";
import CyberSecurity from "../Components/CyberSecurity";
import TechnologyField from "../Components/TechnologyField";
import Navbar from "@/components/Navbar";

const Technology = ({ technologies, certificates, cyberSecurity }) => {
  return (
    <div>
      <Navbar />
      <Banner />
      <CyberSecurity items={cyberSecurity} />
      <TechnologyField technologies={technologies} />
      <Certificates certificates={certificates} />
      <Blogs />
    </div>
  );
};

export default Technology;
