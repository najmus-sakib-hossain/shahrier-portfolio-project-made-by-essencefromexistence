const Activities = ({ upcomingEvents = [] }) => {
  // Get first 4 events for the grid
  const events = upcomingEvents.slice(0, 4);
  
  // Default images if no events
  const defaultImages = [
    "/assets/events/event_activites_1.png",
    "/assets/events/event_activities_2.png",
    "/assets/events/event_activites_3.png",
    "/assets/events/event_activites_4.png"
  ];

  return (
    <div className="w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-12 ">
        <div className="lg:col-span-1">
          <h1 className="text-5xl text-slate-900 font-semibold mb-6">
            Last Events Activities
          </h1>
          <p className="text-slate-900">
            Explore the highlights from my recent events and activities, where I've engaged with communities, shared insights, and collaborated on innovative projects. These moments capture the essence of networking, learning, and growth in the entrepreneurial and tech space, showcasing the dynamic experiences that shape my journey.
          </p>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 mb-6">
            <div className="w-full lg:col-span-2 lg:row-span-2">
                <div className="w-full h-72">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src={events[0]?.image || defaultImages[0]}
                    alt={events[0]?.title || "Event"}
                  />
                </div>
            </div>
            <div className="w-full lg:col-span-1 lg:row-span-1"></div>
            <div className="w-full lg:col-span-1 lg:row-span-1 ">
              <div className="w-full h-36">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={events[1]?.image || defaultImages[1]}
                  alt={events[1]?.title || "Event"}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
            <div className="w-full lg:col-span-1 lg:row-span-1">
              <div className="w-full h-36">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={events[2]?.image || defaultImages[2]}
                  alt={events[2]?.title || "Event"}
                />
              </div>
            </div>
            <div className="w-full lg:col-span-2 lg:row-span-2">
              <div className="w-full h-72">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={events[3]?.image || defaultImages[3]}
                  alt={events[3]?.title || "Event"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
