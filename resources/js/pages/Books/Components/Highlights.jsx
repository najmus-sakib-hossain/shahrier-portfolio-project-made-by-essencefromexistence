const Highlights = ({ books = [] }) => {
  const highlights = books.filter(book => book.highlights).slice(0, 2);
  
  const defaultHighlights = [
    {
      cover_image: "/assets/books/company_award_book.png",
      title: "Best-Selling Technology Book Award",
      highlights: "\"Chat GPT: Risk or Opportunity?\" has been recognized as a pioneering work in exploring the implications of AI technology for businesses and society in Bangladesh."
    },
    {
      cover_image: "/assets/books/uddokta_book.png",
      title: "Innovation in Business Literature Award",
      highlights: "Honored for breaking new ground in business literature by addressing contemporary challenges of AI adoption and digital transformation in emerging markets."
    }
  ];

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  return (
    <div className="bg-slate-900 py-8">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {displayHighlights.map((book, index) => (
            <div key={book.id || index} className="text-white flex items-center gap-6">
              <div>
                <div className="w-24">
                  <img className="w-full" src={book.cover_image || "/assets/books/default.png"} alt={book.title} />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-lg font-semibold mb-4">
                  {book.title}
                </p>
                <p className={index === 0 ? "w-3/4" : "lg:w-3/4"}>
                  {book.highlights}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
