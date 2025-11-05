import { Calendar, MapPin } from "lucide-react";

const Banner = ({ featuredEvents = [] }) => {
  // Default events if none provided
  const defaultEvents = [
    {
      image: "/assets/entepreneourship/slider_1.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_3.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_4.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    },
    {
      image: "/assets/entepreneourship/slider_2.jpeg",
      title: "Tech Innovations Conference 2024",
      event_date: "2024-06-10",
      location: "San Francisco, CA"
    }
  ];

  const displayEvents = featuredEvents.length >= 4 ? featuredEvents.slice(0, 4) : defaultEvents;

  return (
    <div className="bg-slate-50 relative min-h-screen">
      {/* Background Patterns */}
      <div className="absolute right-0 p-1 hidden lg:block">
        <img src="/assets/events/banner_vector.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute left-0 bottom-0 hidden lg:block">
        <img src="/assets/events/bottom_vector.png" alt="" />
      </div>

      <div className="pt-24">
        <h1 className="text-slate-950 text-5xl text-center font-semibold mb-16">
          Active Events
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {[
            {
              lgRotate: "lg:rotate-2",
              lgTranslateX: "lg:translate-x-0",
              lgTranslateY: "lg:translate-y-10",
            },
            {
              lgRotate: "lg:-rotate-4",
              lgTranslateX: "lg:-translate-x-10",
              lgTranslateY: "lg:translate-y-0",
            },
            {
              lgRotate: "lg:-rotate-6",
              lgTranslateX: "lg:-translate-x-16",
              lgTranslateY: "lg:translate-y-4",
            },
            {
              lgRotate: "lg:rotate-3",
              lgTranslateX: "lg:-translate-x-32",
              lgTranslateY: "lg:translate-y-12",
            },
          ].map((style, index) => {
            const event = displayEvents[index];
            return (
              <div
                key={event?.id || index}
                className={`group w-88 h-[500px] relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out 
                ${style.lgRotate} ${style.lgTranslateX} ${style.lgTranslateY}
                lg:hover:rotate-0 lg:hover:translate-x-0 lg:hover:translate-y-0 lg:hover:scale-105 lg:group-hover:z-10`}
              >
                {/* Image */}
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={event?.image || "/assets/events/default.png"}
                  alt={event?.title || "Event"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4">
                  <a href="/ai-summit">
                    <h1 className="text-3xl font-semibold mb-6">
                      {event?.title || "Tech Innovations Conference 2024"}
                    </h1>
                  </a>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-300">
                      <Calendar size={24} />
                    </p>
                    <p className="text-slate-300">
                      {event?.event_date ? new Date(event.event_date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'June 10, 2024'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-slate-300">
                      <MapPin size={24} />
                    </p>
                    <p className="text-slate-300">{event?.location || "San Francisco, CA"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
