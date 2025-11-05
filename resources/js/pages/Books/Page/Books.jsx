import Banner from "../Components/Banner";
import Highlights from "../Components/Highlights";
import Summary from "../Components/Summary";
import Review from "../Components/Review";
import RecommendedBooks from "../Components/RecommendedBooks";
import Navbar from "@/components/Navbar";

const Books = ({ recommendedBooks, allBooks }) => {
  return (
    <div>
      <Navbar />
      <Banner books={allBooks} />
      <Highlights books={allBooks} />
      <Summary books={allBooks} />
      <Review books={allBooks} />
      <RecommendedBooks books={recommendedBooks} />
    </div>
  );
};

export default Books;
