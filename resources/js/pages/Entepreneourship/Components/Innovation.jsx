import { useState } from "react";
import { X } from "lucide-react";

const Innovation = ({ innovations = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInnovation, setSelectedInnovation] = useState(null);

  // Default innovations if none provided
  const defaultInnovations = [
    {
      id: 1,
      title: "NexKraft",
      description: "Spotlighting the next generation of technological advancements.",
      long_description: "NexKraft is an innovative startup focused on transforming the digital world through cutting-edge solutions.",
      image: "/assets/entepreneourship/nexkraft.png"
    },
    {
      id: 2,
      title: "Mechani",
      image: "/assets/entepreneourship/mechani.png"
    },
    {
      id: 3,
      title: "Huistle",
      image: "/assets/entepreneourship/huistle.png"
    },
    {
      id: 4,
      title: "Mindshaper",
      image: "/assets/entepreneourship/mindshaper.png"
    }
  ];

  const displayInnovations = innovations.length > 0 ? innovations : defaultInnovations;
  const mainInnovation = displayInnovations[0];
  const otherInnovations = displayInnovations.slice(1, 4);

  const handleOpenModal = (innovation) => {
    setSelectedInnovation(innovation);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white w-11/12 lg:w-9/12 mx-auto py-18">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold text-slate-900 lg:w-3/4 mb-6">
            Igniting Innovation: A Startup Journey
          </h1>
          <p className="text-slate-900">
            Embarking on a journey of innovation, I've founded and nurtured several startups that push the boundaries of technology and creativity. From NexKraft's focus on next-generation technological advancements to Mechani's engineering solutions, Huistle's innovative platforms, and Mindshaper's transformative ideas, each venture represents a step towards transforming bold concepts into impactful realities. This entrepreneurial path has been about more than just building companies—it's about fostering a culture of innovation that drives progress and creates lasting value in the digital world.
          </p>
        </div>

        <div
          className="w-full cursor-pointer"
          onClick={() => handleOpenModal(mainInnovation)}
        >
          <img 
            className="w-full object-cover" 
            src={mainInnovation?.image || mainInnovation?.featured_image || "/assets/entepreneourship/nexkraft.png"} 
            alt={mainInnovation?.title || "Innovation"} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-24">
        {otherInnovations.map((innovation) => (
          <div 
            key={innovation.id} 
            className="w-full h-96 cursor-pointer"
            onClick={() => handleOpenModal(innovation)}
          >
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={innovation.image || innovation.featured_image || "/assets/entepreneourship/default.png"}
              alt={innovation.title}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedInnovation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#2E5AFF] p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <button
              className="absolute top-3 right-3 text-xl text-white hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="w-11/12 lg:w-9/12 mx-auto py-16">
              <h1 className="text-white mb-10">
                <span className="text-5xl font-semibold">"{selectedInnovation.title}"</span>
                {selectedInnovation.description && (
                  <>
                    {" – "}
                    <span className="text-3xl font-medium">
                      {selectedInnovation.description}
                    </span>
                  </>
                )}
              </h1>
              <img
                className="w-full rounded-lg"
                src={selectedInnovation.image || selectedInnovation.featured_image || "/assets/entepreneourship/default.png"}
                alt={selectedInnovation.title}
              />
              <p className="mt-4 text-white">
                {selectedInnovation.long_description || selectedInnovation.content || selectedInnovation.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Innovation;
