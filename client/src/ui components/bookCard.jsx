import { API_URL } from "../../api";

function BookCard({ title, author, isbn, price, pic }) {
  const picSource = `${API_URL}/${pic}`;

  return (
    <div className=" text-white p-4 m-4 flex flex-col items-center">
      <img src={picSource} className=" w-auto h-60 rounded-t-lg shadow-sm" />
      <div className="p-2 text-center">
        <p className="text-sm">ISBN: {isbn}</p>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm">{author.name}</p>
        <p className="text-lg font-bold text-orange-600">${price}</p>
      </div>
    </div>
  );
}

export default BookCard;
