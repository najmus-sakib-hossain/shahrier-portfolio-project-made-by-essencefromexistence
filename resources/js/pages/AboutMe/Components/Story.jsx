const Story = ({ section }) => {
  // Get story sections from props, or use default fallback
  const storySections = section || [];
  
  // Default fallback content
  const defaultSections = [
    {
      title: "The start of a bigger story",
      content: "Shahriar Khan's journey began with a passion for technology and business. Graduating from East West University with a Master of Business Administration in Banking, Corporate, Finance, and Securities Law, he embarked on a path that would lead him to become a prominent figure in the tech industry.\n\nHis early experiences shaped his vision for innovative solutions that bridge technology with real-world business challenges. Through perseverance and strategic thinking, Shahriar transformed ideas into successful ventures, establishing himself as a leader in digital transformation.",
      image: "/assets/about_me/bigger_story.png",
      imagePosition: "right"
    },
    {
      title: "The secret to living is giving",
      content: "Shahriar believes that true success comes from giving back to the community. Through his entrepreneurial ventures and philanthropic efforts, he has supported numerous initiatives in education, technology, and social development.\n\nHis commitment to mentorship and knowledge sharing has helped countless young professionals enter the tech industry. By founding Nexkraft LTD in 2011, Shahriar has created opportunities for innovation and growth, proving that business success and social responsibility can go hand in hand.",
      image: "/assets/about_me/secret_living.png",
      imagePosition: "left"
    },
    {
      title: "A life dedicated to a greater purpose",
      content: "Shahriar Khan's life is driven by a greater purpose: to harness technology for positive change. As CEO of Nexkraft LTD, he leads initiatives that promote digital literacy, cybersecurity awareness, and sustainable business practices.\n\nHis work extends beyond business, encompassing education through ICT Olympiad Bangladesh, innovative solutions through various ventures, and thought leadership through publications and speaking engagements. Shahriar continues to inspire others to pursue excellence with integrity and purpose.",
      image: "/assets/about_me/dedicated.png",
      imagePosition: "right"
    }
  ];

  // Use section from backend if available, otherwise use defaults
  const sections = section ? [section] : defaultSections;

  return (
    <div className="py-16 w-11/12 lg:w-9/12 mx-auto">
      {sections.map((item, index) => {
        const isImageRight = index % 2 === 0;
        const paragraphs = item.content?.split('\n\n') || [];
        
        return (
          <div key={index} className={`flex flex-col ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:justify-between gap-10 lg:gap-0 py-12`}>
            <div className="lg:w-1/2">
              <h3 className="text-slate-950 font-semibold text-4xl mb-8">
                {item.title}
              </h3>

              {paragraphs.map((para, pIndex) => (
                <p key={pIndex} className="text-slate-950 mb-8">
                  {para}
                </p>
              ))}
            </div>

            <div className="lg:relative">
              <div className="z-10">
                <img src={item.image || "/assets/about_me/default.png"} alt={item.title} />
              </div>

              <div className="absolute -top-8 -right-8 hidden lg:block">
                <img src="/assets/about_me/frame.svg" alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Story;
