import { Tag, Clock, MapPin } from "lucide-react";

const All = ({ lifeEvents = [] }) => {
  // Default life events if none provided
  const defaultEvents = [
    {
      id: 1,
      title: "Winning Strategy with SWOT",
      category: "Achievement",
      event_date: "2024-01-15",
      location: "Dhaka, Bangladesh",
      description: "The SWOT analysis framework has been instrumental in my strategic planning, helping me identify strengths, weaknesses, opportunities, and threats in various aspects of my life and career. By leveraging this tool, I've developed winning strategies that have led to successful outcomes in entrepreneurship, technology innovation, and personal growth.",
      image: "/assets/life_events/winning_strategy.png",
      gallery: [
        "/assets/life_events/winning_strategy_mini1.png",
        "/assets/life_events/winning_strategy_mini2.png",
        "/assets/life_events/winning_strategy_mini3.png"
      ]
    }
  ];

  const displayEvents = lifeEvents.length > 0 ? lifeEvents : defaultEvents;

  return (
    <div className="bg-slate-100">
      {displayEvents.map((event, index) => {
        const isImageRight = index % 2 === 0;
        const gallery = Array.isArray(event.gallery) ? event.gallery : [];
        
        return (
          <div key={event.id} className="w-11/12 lg:w-9/12 mx-auto py-18">
            <div className={`grid grid-cols-1 lg:grid-cols-2 lg:place-items-center gap-10 ${!isImageRight ? 'lg:flex-row-reverse' : ''}`}>
              {isImageRight ? (
                <>
                  <div>
                    <div className="w-full relative">
                      <img className="w-full" src={event.image || "/assets/life_events/default.png"} alt={event.title} />
                      {gallery.length > 0 && (
                        <div className="hidden lg:block">
                          <div className="grid grid-cols-3 gap-x-3 absolute bottom-4 px-4">
                            {gallery.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt={`${event.title} gallery ${idx + 1}`} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-5xl text-slate-900 font-semibold mb-6">
                      {event.title}
                    </h3>
                    <div className="flex items-center flex-wrap lg:flex-nowrap gap-4 mb-6">
                      {event.category && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><Tag /></p>
                          <p>{event.category}</p>
                        </div>
                      )}
                      {event.event_date && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><Clock /></p>
                          <p>{new Date(event.event_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {event.location && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><MapPin /></p>
                          <p>{event.location}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-700">{event.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-5xl text-slate-900 font-semibold mb-6">
                      {event.title}
                    </h3>
                    <div className="flex items-center flex-wrap lg:flex-nowrap gap-4 mb-6">
                      {event.category && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><Tag /></p>
                          <p>{event.category}</p>
                        </div>
                      )}
                      {event.event_date && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><Clock /></p>
                          <p>{new Date(event.event_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {event.location && (
                        <div className="bg-[#5C7EFF] px-6 py-2 rounded-lg text-white flex items-center gap-2">
                          <p><MapPin /></p>
                          <p>{event.location}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-700">{event.description}</p>
                  </div>
                  <div>
                    <div className="w-full relative">
                      <img className="w-full" src={event.image || "/assets/life_events/default.png"} alt={event.title} />
                      {gallery.length > 0 && (
                        <div className="hidden lg:block">
                          <div className="grid grid-cols-3 gap-x-3 absolute bottom-4 px-4">
                            {gallery.slice(0, 3).map((img, idx) => (
                              <img key={idx} src={img} alt={`${event.title} gallery ${idx + 1}`} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default All;
