import React from "react";

const RecommendedBooks = ({ books = [] }) => {
  // Default fallback
  const defaultBooks = [
    { cover_image: "/assets/books/recommended_book1.png" },
    { cover_image: "/assets/books/recommended_book2.png" },
    { cover_image: "/assets/books/recommended_book3.png" },
    { cover_image: "/assets/books/recommended_book4.png" },
    { cover_image: "/assets/books/recommended_book5.png" },
  ];

  const displayBooks = books.length > 0 ? books.slice(0, 5) : defaultBooks;

  return (
    <div className="bg-white py-18">
      <div>
        <h1 className="text-5xl font-semibold text-slate-950 text-center mb-12">
          Recommended Books
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 ">
          {displayBooks.map((book, index) => (
            <div key={book.id || index} className="p-14 bg-slate-100 border border-slate-300">
              <img src={book.cover_image || "/assets/books/default.png"} alt={book.title || "Book cover"} />
            </div>
          ))}
        </div>

        <div className="w-11/12 lg:w-9/12 mx-auto mt-18">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <div className="lg:w-1/2 ">
              <h1 className="text-5xl font-semibold text-slate-950 mb-8">
                {books[0]?.title || "Publication Summary"}
              </h1>
              <p className="text-slate-950 text-lg mb-8">
                {books[0]?.summary || '"Chat GPT: Risk or Opportunity?" has been widely acclaimed for its insightful analysis of artificial intelligence\'s role in modern business. The book provides practical guidance for entrepreneurs and business leaders navigating the AI revolution.'}
              </p>
              {books[0]?.review && (
                <p className="text-slate-950 text-lg">
                  {books[0].review}
                </p>
              )}
              {!books[0]?.review && (
                <p className="text-slate-950 text-lg">
                  Through real-world examples and strategic frameworks, Shahriar Khan offers a balanced perspective on leveraging AI opportunities while managing associated risks, making it an essential read for anyone interested in the future of technology and business.
                </p>
              )}
            </div>

            <div className="flex-1 flex items-center justify-end">
              <img src={books[0]?.cover_image || "/assets/books/publication_image.png"} alt={books[0]?.title || "Publication"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedBooks;
