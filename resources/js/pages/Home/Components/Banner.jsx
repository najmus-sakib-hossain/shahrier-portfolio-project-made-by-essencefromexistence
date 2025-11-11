import { useState, useEffect } from "react";

const Banner = ({ hero, statistics }) => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("hasSeenSplash", "true");
      }, 2000);
    }
  }, []);

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Get font settings with defaults
  const getFontSize = (type) => {
    const defaults = {
      subtitle: 'text-4xl lg:text-6xl',
      tagline: 'text-3xl',
      description: 'text-4xl lg:text-6xl'
    };
    return hero?.font_settings?.[`${type}_size`] || defaults[type];
  };

  // Get active social links
  const getActiveSocialLinks = () => {
    if (!hero?.social_link_settings || hero.social_link_settings.length === 0) {
      // Default social links if no settings
      const defaultLinks = [];
      if (hero?.social_links?.linkedin) {
        defaultLinks.push({ platform: 'linkedin', label: 'LinkedIn', is_active: true, url: hero.social_links.linkedin });
      }
      if (hero?.social_links?.dribbble) {
        defaultLinks.push({ platform: 'dribbble', label: 'Dribbble', is_active: true, url: hero.social_links.dribbble });
      }
      if (hero?.social_links?.behance) {
        defaultLinks.push({ platform: 'behance', label: 'Behance', is_active: true, url: hero.social_links.behance });
      }
      return defaultLinks;
    }
    
    return hero.social_link_settings.filter(link => link.is_active && hero.social_links?.[link.platform]);
  };

  const activeSocialLinks = getActiveSocialLinks();

  // Get icon for social platform
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: '/assets/home/linkedin.svg',
      dribbble: '/assets/home/dribble.svg',
      behance: '/assets/home/behance.svg'
    };
    return icons[platform] || '/assets/home/linkedin.svg';
  };

  return (
    <div className="w-full mx-auto h-screen relative">
      {showSplash && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50 transition-opacity duration-1000">
          <h1 className="text-5xl font-bold text-black animate-bounce special-text">
            {hero?.title || "Shahriar Khan"}
          </h1>
        </div>
      )}

      {!showSplash && (<>
        <div className="w-full relative flex">
          <div className="w-2/3 h-full ">
            <div className="h-[500px] md:h-[600px] lg:h-[800px] relative">
              <img
                src={hero?.image_url || "/assets/home_banner.png"}
                alt="Home Banner"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 w-full h-full flex items-end justify-start text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 41.23%, #000 99.94%)",
                }}
              >
                <p className={`${getFontSize('subtitle')} font-semibold p-5 lg:p-20 break-words`}>
                  {truncateText(
                    hero?.subtitle || "Embrace the extraordinary. Live your fullest life.",
                    hero?.subtitle_max_length || 200
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/3 h-[500px] md:h-[600px] lg:h-[800px] flex flex-col justify-center">
            <div className="flex items-center gap-4 px-5 lg:px-20 mb-6 lg:mt-48">
              <p className={`${getFontSize('tagline')} font-medium text-slate-900 break-words`}>
                {truncateText(
                  hero?.tagline || "Entrepreneur",
                  hero?.tagline_max_length || 50
                )}
              </p>
              <div className="w-20 h-1 bg-slate-900"></div>
            </div>
            <h1 className={`${getFontSize('description')} font-semibold text-slate-900 px-5 lg:px-20 break-words`}>
              {truncateText(
                hero?.description || "Connecting brands & people through experiences.",
                hero?.description_max_length || 150
              )}
            </h1>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row min-h-36">
          <div className="w-full lg:w-2/3 py-6 bg-[#3b3939d3] bg-opacity-10 backdrop-blur-sm min-h-full">
            <div className="w-11/12 mx-auto h-full flex items-center justify-center">
              <div className={`h-full grid ${
                statistics && statistics.length > 6 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6' 
                  : statistics && statistics.length > 4
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                    : 'grid-cols-2 lg:grid-cols-4'
              } gap-4 lg:gap-6`}>
                {statistics && statistics
                  .filter((stat, index, self) => self.findIndex(s => s.label === stat.label) === index)
                  .map((stat) => (
                    <div className="flex flex-col items-center justify-center px-2" key={stat.id}>
                      <h1 className="text-white font-semibold text-xl md:text-2xl mb-2 md:mb-3 text-center break-words">
                        {stat.value}
                      </h1>
                      <p className="text-sm md:text-base lg:text-lg text-slate-300 text-center break-words">
                        {stat.label}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="py-6 lg:py-[46px] bg-slate-900 min-h-full w-full lg:w-1/3">
            <div className="h-full flex items-center justify-center gap-4 lg:gap-6 flex-wrap px-4">
              <h1 className="text-base lg:text-lg font-bold text-white w-full lg:w-auto text-center lg:text-left">Social Media:</h1>
              {activeSocialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={getSocialIcon(link.platform)} 
                    alt={link.label} 
                    className="w-4 h-4 md:w-5 md:h-5" 
                  />
                  <span className="text-sm md:text-base lg:text-lg text-white font-normal">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default Banner;
