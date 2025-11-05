import Banner from "../Components/Banner";
import Report from "../Components/Report";
import Awards from "../Components/Awards";
import Story from "../Components/Story";
import Impact from "../Components/Impact";
import Travel from "../Components/Travel";
import Corporate from "../Components/Corporate";
import Associate from "../Components/Associate";
import BannerExp from "../Components/BannerExp";
import Navbar from "@/components/Navbar";

const Aboutus = ({ sections, awards }) => {
  // sections is grouped by section_type, so it's an object like { story: [...], impact: [...], travel: [...] }
  const storySection = sections?.story?.[0];
  const impactSection = sections?.impact?.[0];
  const travelSection = sections?.travel?.[0];

  return (
    <div>
      <Navbar />
      <BannerExp />
      <Report />
      <Awards awards={awards} />
      <Story section={storySection} />
      <Impact section={impactSection} />
      <Travel section={travelSection} />
      <Corporate />
      <Associate />
    </div>
  );
};

export default Aboutus;
