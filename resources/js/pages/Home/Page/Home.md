# Useless code

```tsx
  import Navbar from "../../../Components/Navbar";
  import Banner from "../Components/Banner";

  const Home = () => {
    return (
      <div className="relative flex flex-col">
        <div className="w-full absolute top-0 left-0 z-50 bg-transparent">
          <Navbar />
        </div>{" "}
        <Banner />
      </div>
    );
  };

  export default Home;

const Home = () => {
  return (
    <div className="relative flex-col bg-[#000] min-h-screen text-[#272121] flex items-center justify-center overflow-hidden">
      <span className="text-8xl font-bold">SHAHRIER</span>
      <img src="assets/shahrier.png" alt="Shahrier" className="absolute bottom-0" />
      <img src="assets/csg.png" alt="CSG" className="absolute top-0" />
      <img src="assets/huecell.png" alt="Huecell" className="absolute top-0" />
      <img src="assets/ict-olympiad-bangladesh.png" alt="ICT Olympiad Bangladesh" className="absolute top-0" />
      <img src="assets/mechanix.png" alt="Mechanix" className="absolute top-0" />
      <img src="assets/mindshaper.png" alt="Mindshaper" className="absolute top-0" />
      <img src="assets/my-brand-story.png" alt="My Brand Story" className="absolute top-0" />
      <img src="assets/nex-sports.png" alt="Nex Sports" className="absolute top-0" />
      <img src="assets/nex-academy.png" alt="Nex Academy" className="absolute top-0" />
      <img src="assets/nex-real-estate.png" alt="Nex Real Estate" className="absolute top-0" />
      <img src="assets/nex-fly.png" alt="Nex Fly" className="absolute top-0" />
    </div>
  );
};

export default Home;


```
