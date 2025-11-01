import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BookCard from "../ui components/bookCard";
import Navbar from "../ui components/navbar";
import Footer from "../ui components/footer";
import { API_URL } from "../../api";

function Books() {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setdata(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const skeletonArray = Array.from({ length: 9 });

  return (
    <main className="min-h-screen text-white bg-black">
      <Navbar />

      <h1 className="text-4xl font-extrabold text-center text-mint mb-8">
        Our Collection
      </h1>

      <SkeletonTheme baseColor="#6d14a4" highlightColor="#7FFFD4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading &&
            skeletonArray.map((_, index) => (
              <div
                key={index}
                className="text-white p-4 flex flex-col items-center rounded-lg bg-neutral-900"
              >
                {/* Image placeholder*/}
                <Skeleton
                  height={240}
                  width={160}
                  className="rounded-t-lg mb-3 shadow-sm"
                />

                {/* Text placeholders */}
                <div className="p-2 text-center w-full max-w-[180px]">
                  <Skeleton width={100} height={16} className="mb-2" />
                  <Skeleton width={140} height={20} className="mb-2" />
                  <Skeleton width={120} height={16} className="mb-2" />
                  <Skeleton width={60} height={20} />
                </div>
              </div>
            ))}

          {error && <p>Error: {error}</p>}

          {data && data.map((book) => <BookCard key={book.id} {...book} />)}
        </div>
      </SkeletonTheme>

      <Footer />
    </main>
  );
}

export default Books;
