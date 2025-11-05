import React from "react";

const Summary = ({ books = [] }) => {
  const book = books[0];
  
  return (
    <div className="bg-white py-16">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h1 className="text-5xl font-semibold text-slate-950 text-center mb-8">
          {book?.title ? `${book.title} - Summary` : "Book Summary"}
        </h1>
        <p className="text-slate-950 text-center font-semibold text-lg mb-4">
          {book?.summary || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights."}
        </p>
        {book?.description && (
          <p className="text-slate-950 text-center font-semibold text-lg">
            {book.description}
          </p>
        )}
        {!book?.description && (
          <p className="text-slate-950 text-center font-semibold text-lg">
            Recognized for excellence in delivering top-tier event planning
            services across the country, setting industry standards in creativity,
            organization, and client satisfaction. Recognized for excellence in
            delivering top-tier event planning services across the country,
            setting industry standards in creativity, organization, and client
            satisfaction.
          </p>
        )}
      </div>
    </div>
  );
};

export default Summary;
