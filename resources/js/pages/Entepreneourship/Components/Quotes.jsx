const Quotes = ({ quotes = [] }) => {
  const displayQuote = quotes[0] || {
    content: "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights."
  };
  
  return (
    <div className="bg-slate-950 py-16">
      <div className="w-11/12 lg:w-6/12 mx-auto">
        <p className="text-center text-2xl font-semibold text-white">
          {displayQuote.content || displayQuote.quote || displayQuote.title}
        </p>
        {displayQuote.author && (
          <p className="text-center text-lg text-gray-400 mt-4">
            - {displayQuote.author}
          </p>
        )}
      </div>
    </div>
  );
};

export default Quotes;
