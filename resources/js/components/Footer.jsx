import { useState } from "react";
import { ArrowUp } from "lucide-react";
import "./footer.css";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div
        className={`footer-container flex flex-col items-center justify-center h-screen text-white ${
          isHovered ? "hovered" : "unhovered"
        }`}
      >
        <h1
          className="text-3xl md:text-5xl font-bold border-b-2 pb-1 relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Let’s create together
        </h1>

        {/* Fixed within Footer */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 px-6 py-6 bg-gray-700 hover:bg-gray-600 rounded-full"
        >
          <ArrowUp className="text-xl" />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-6 text-sm uppercase tracking-wide relative z-10 bg-slate-950 py-6">
        <h1 className="text-lg font-semibold text-white">
          {" "}
          <a href="#" className="hover:underline">
            LinkedIn
          </a>
        </h1>
        <h1 className="text-lg font-semibold text-white">
          <a href="#" className="hover:underline">
            Facebook
          </a>
        </h1>
        <h1 className="text-lg font-semibold text-white">
          {" "}
          <a href="#" className="hover:underline">
            Instagram
          </a>
        </h1>
        <h1 className="text-lg font-semibold text-white">
          {" "}
          <a href="#" className="hover:underline">
            Pinterest
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
