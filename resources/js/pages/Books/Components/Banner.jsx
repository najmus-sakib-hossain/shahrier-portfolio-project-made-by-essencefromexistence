import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Book, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Custom Left Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 z-10 text-slate-900 bg-white p-4 rounded-full shadow-md hover:bg-gray-200 -translate-y-1/2 top-1/2"
      onClick={onClick}
    >
      <ChevronLeft size={20} />
    </button>
  );
};

// Custom Right Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 z-10 text-slate-900 bg-white p-4 rounded-full shadow-md hover:bg-gray-200 -translate-y-1/2 top-1/2"
      onClick={onClick}
    >
      <ChevronRight size={20} />
    </button>
  );
};

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />, // Fixed: Passed correctly
    nextArrow: <NextArrow />, // Fixed: Passed correctly
  };

  return (
    <div className="w-full mx-auto py-24 bg-slate-100 relative overflow-hidden">
      <div className="absolute right-4 hidden lg:block w-[700px]">
        <img src="/assets/books/pattern_bg.png" alt="" className="w-full" />
      </div>
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-4">
              {/* Book Image Section */}
              <div className="flex-1">
                <div>
                  <img src="/assets/books/book.png" alt="Book" />
                </div>
                <p className="flex items-center justify-center gap-4 text-lg px-4 py-2 rounded-xl border border-[#2E5AFF] text-[#2E5AFF] font-semibold mt-4 lg:w-1/3 mx-auto text-center">
                  Read a Little <Book />
                </p>
              </div>

              {/* Text Content Section */}
              <div className="flex-1">
                <h1 className="text-4xl font-semibold text-slate-900 mb-4">
                  Chat GPT: Risk or Opportunity?
                </h1>
                <p className="text-slate-900 mb-4 lg:w-3/4">
                  Living an extraordinary life means shaping it on your terms,
                  filled with deep meaning and significant impact. Fueled by the
                  quest for excellence and a strong sense of purpose, Shahriar
                  Khan has motivated millions to dream boldly and strive for
                  greater heights.
                </p>
                <p className="text-slate-900 font-semibold text-xl mb-8">
                  Price: 240 BDT
                </p>

                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-[#2E5AFF]">
                  <div className="absolute w-full h-full animate-spin-slow">
                    {Array.from({ length: 1 }).map((_, index) => (
                      <span
                        key={index}
                        className="absolute text-white font-bold text-sm p-[6px]"
                        style={{
                          transform: `rotate(${index * 30}deg) rotate(-${
                            index * 30
                          }deg)`,
                          transformOrigin: "0 50%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <img src="/assets/books/TextFlex_ Buy Now _ Buy Now _ Buy Now _.png" alt="" />
                      </span>
                    ))}
                  </div>
                  <ExternalLink
                    size={28}
                    className="text-white relative"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Slides (if needed) */}
          <div className="h-full w-full flex items-cener justify-center mt-56">
            <h2 className="text-3xl font-bold text-center">
              Thanks for coming here!
            </h2>
            <p className="text-center mt-4">
              More contents coming soon...
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
