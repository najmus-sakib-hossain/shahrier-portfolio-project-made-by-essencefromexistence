import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Certificates = ({ certificates = [] }) => {
  // Default certificates if none provided
  const defaultCertificates = [
    { certificate_image: "/assets/technology/certificate_1.png" },
    { certificate_image: "/assets/technology/certificate_2.png" },
    { certificate_image: "/assets/technology/certificate_3.png" },
    { certificate_image: "/assets/technology/certificate_1.png" },
  ];

  const displayCertificates = certificates.length > 0 ? certificates : defaultCertificates;

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-indigo-300 text-white rounded-full p-3 cursor-pointer shadow-lg z-10"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-indigo-300 text-white rounded-full p-3 cursor-pointer shadow-lg z-10"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, displayCertificates.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, displayCertificates.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <h1 className="text-5xl text-slate-900 font-semibold mb-4 text-center">
        Certificates
      </h1>
      <p className="text-slate-600 text-center mb-12">
        Shahriar Khan holds various professional certifications in technology, cybersecurity, and business management. These credentials validate his expertise and commitment to staying current with industry standards and best practices.
      </p>

      {displayCertificates.length > 0 && (
        <Slider {...settings}>
          {displayCertificates.map((cert, index) => (
            <div key={cert.id || index} className="px-2">
              <div className="w-full h-[400px] relative rounded-2xl overflow-hidden">
                {/* Image */}
                <img
                  className="w-full h-full object-contain rounded-2xl"
                  src={cert.certificate_image || "/assets/technology/certificate_1.png"}
                  alt={cert.title || "Certificate"}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Certificates;
