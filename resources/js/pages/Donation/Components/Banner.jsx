const Banner = ({ donations = [] }) => {
  const featuredDonation = donations.find(d => d.is_active) || donations[0];
  
  return (
    <div className="bg-background w-full mx-auto p-2 lg:p-6 pt-0 lg:pt-0 relative overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${featuredDonation?.banner_image || "/assets/donation/donation.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "10%",
          borderRadius: "20px",
        }}
      >
        <div className="flex flex-col items-start text-left max-w-4xl">
          <div className="flex items-center gap-4 text-white">
            <div className="w-16 h-1 bg-white"></div>
            <h4 className="text-3xl font-medium">{featuredDonation?.subtitle || "My Thoughts"}</h4>
          </div>
          <h1 className="text-xl lg:text-5xl font-semibold mt-2 leading-relaxed text-white">
            {featuredDonation?.quote || '"We are now in the era of the 4th industrial revolution, where everything depends on technology. So we also have to depend on technology"'}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
