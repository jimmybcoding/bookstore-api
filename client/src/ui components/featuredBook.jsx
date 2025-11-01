import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BookCard from "./bookCard";
import { API_URL } from "../../api";

function FeaturedBook() {
  const [book, setBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchFeaturedBook = async () => {
      try {
        const response = await fetch(`${API_URL}/books/random`);
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        setBook(result);
      } catch (error) {
        console.error("Error fetching featured book:", error);
        setFetchError(true);
      }
    };

    fetchFeaturedBook();
  }, []);

  const picSource = book ? `${API_URL}/${book.pic}` : null;

  // Skeleton loader if book is not loaded yet
  if (!book && !fetchError) {
    return (
      <SkeletonTheme baseColor="#1a0b2e" highlightColor="#7FFFD4">
        <section className="flex flex-col md:flex-row items-center justify-center p-12 bg-black">
          {/* Left image placeholder */}
          <Skeleton
            height={384}
            width={256}
            className="rounded-xl shadow-lg mb-6 md:mb-0 md:mr-8"
          />

          {/* Right text area */}
          <div className="max-w-md text-center md:text-left">
            {/* Title*/}
            <Skeleton width={240} height={36} className="mb-4" />
            {/* Button */}
            <Skeleton width={150} height={48} borderRadius={8} />
          </div>
        </section>
      </SkeletonTheme>
    );
  }

  // Show placeholder if fetch failed
  if (fetchError) {
    return <PlaceholderBook />;
  }

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-0 right-0 m-2 text-mint hover:scale-125 hover:cursor-pointer transform transition-transform z-10"
            >
              ✕
            </button>
            <BookCard
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              price={book.price}
              pic={book.pic}
            />
          </div>
        </div>
      )}

      <section className="flex flex-col md:flex-row items-center justify-center p-12 bg-black">
        <img
          src={picSource}
          alt={book.title}
          className="w-64 rounded-xl shadow-lg mb-6 md:mb-0 md:mr-8"
        />
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">
            Featured Book: {book.title}
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block text-mint px-6 py-3 rounded-lg font-semibold border-2 border-text-mint hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
          >
            View Book
          </button>
        </div>
      </section>
    </>
  );
}

export default FeaturedBook;
