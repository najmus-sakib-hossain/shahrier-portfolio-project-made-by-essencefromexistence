import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../assets/about_me/slider_img_1.png";
import slider2 from "../assets/about_me/slider_img_2.png";
import slider3 from "../assets/about_me/slider_img_3.png";

const InfiniteSlider = () => {
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [slider1, slider2, slider3, slider1];

  return (
    <div className="w-full overflow-hidden bg-slate-950 py-24">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteSlider;
