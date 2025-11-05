const Donate = ({ donations = [] }) => {
  // Default donation cards if none provided
  const defaultDonations = [
    { 
      id: 1, 
      image: "/assets/donation/donate_card1.png", 
      title: "Donate to homeless children" 
    },
    { 
      id: 2, 
      image: "/assets/donation/donate_card2.png", 
      title: "Donate to Gazans in Palestine" 
    },
  ];

  const displayDonations = donations.length > 0 ? donations : defaultDonations;

  return (
    <div className="bg-slate-950 py-18 relative">
      <h1 className="text-5xl text-white font-semibold underline text-center mb-12">
        Donation
      </h1>
      <div className="absolute right-0 top-0 hidden lg:block">
        <img src="/assets/donation/vector_pattern.svg" alt="" />
      </div>

      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {displayDonations.map((donation) => (
            <div
              key={donation.id}
              style={{
                backgroundImage: `url(${donation.image || "/assets/donation/default.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "flex-end",
                paddingLeft: "36px",
                borderRadius: "20px",
                position: "relative",
              }}
            >
              <h1 className="text-2xl lg:text-5xl text-white font-semibold mb-6">
                {donation.title}
              </h1>
              <a href={`/donate-details/${donation.id}`}>
                <button className=" text-[#2E5AFF] bg-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white mb-8">
                  Donate Now
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donate;
