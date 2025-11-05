import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronRight size={24} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 bg-gray-100 text-slate-950 rounded-full p-3 cursor-pointer shadow-lg z-10"
    onClick={onClick}
  >
    <ChevronLeft size={24} />
  </div>
);

const AllEvents = ({ pastEvents = [], upcomingEvents = [] }) => {
  // Combine all events
  const allEvents = [...upcomingEvents, ...pastEvents];
  
  // Default fallback events
  const defaultEvents = [
    {
      image: "/assets/entepreneourship/slider_1.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: "/assets/entepreneourship/slider_2.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: "/assets/entepreneourship/slider_3.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: "/assets/entepreneourship/slider_4.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
    {
      image: "/assets/entepreneourship/slider_5.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA",
    },
  ];

  const displayEvents = allEvents.length > 0 ? allEvents : defaultEvents;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, displayEvents.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, displayEvents.length) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Get unique years from events
  const years = [...new Set(allEvents.map(event => 
    new Date(event.event_date).getFullYear()
  ))].sort((a, b) => b - a);

  return (
    <div className="bg-[#2E5AFF] py-18">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl text-white font-semibold">Events</h1>

          <select className="block max-w-sm bg-white text-slate-900 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option selected>All Years</option>
            {years.map(year => (
              <option key={year}>{year}</option>
            ))}
            {years.length === 0 && (
              <>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </>
            )}
          </select>
        </div>

        {displayEvents.length > 0 && (
          <Slider {...settings}>
            {displayEvents.map((event, index) => (
              <div key={event.id || index} className="px-2">
                <div className="w-full h-[500px] relative rounded-2xl overflow-hidden">
                  {/* Image */}
                  <img
                    className="w-full h-full object-cover rounded-2xl"
                    src={event.image || "/assets/events/default.png"}
                    alt={event.title}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4">
                    <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-300">
                        <Calendar size={24} />
                      </p>
                      <p className="text-slate-300">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Date TBA'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-slate-300">
                        <MapPin size={24} />
                      </p>
                      <p className="text-slate-300">{event.location || 'Location TBA'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
