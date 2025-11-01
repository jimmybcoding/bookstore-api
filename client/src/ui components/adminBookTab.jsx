import { useState } from 'react';
import AddBookForm from './addBookForm';
import { API_URL } from '../../api';

function AdminBookTab() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleGetBooks = async () => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/books`);
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => setEditingId(id);

  const handleChange = (id, field, value) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, [field]: value } : book
      )
    );
  };

  const handleSave = async (id) => {
    const book = books.find((b) => b.id === id);
    const payload = {
      ...book,
      published: new Date(book.published),
      price: parseFloat(book.price),
      authorId: parseInt(book.authorId, 10)
    };

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update book');
      setEditingId(null);
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete book');
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) { 
      console.error('Error deleting book:', err);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-mint mb-4">Books CRUD Operations</h2>

      <button
        onClick={handleGetBooks}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        GET Books
      </button>
      
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Add New Book
      </button>
      {showAddForm && <AddBookForm />}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {books.length > 0 && (
        <ul className="mt-6 space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="flex flex-col gap-2 border-b border-mint pb-4"
            >
              {editingId === book.id ? (
                <>
                  <input
                    type="text"
                    value={book.title}
                    onChange={(e) => handleChange(book.id, 'title', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="date"
                    value={book.published?.split('T')[0] || ''}
                    onChange={(e) => handleChange(book.id, 'published', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={book.isbn}
                    onChange={(e) => handleChange(book.id, 'isbn', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={book.price}
                    onChange={(e) => handleChange(book.id, 'price', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={book.pic}
                    onChange={(e) => handleChange(book.id, 'pic', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="number"
                    value={book.authorId}
                    onChange={(e) => handleChange(book.id, 'authorId', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSave(book.id)}
                      className="text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-orange-600 border-orange-600 border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Title:</strong> {book.title}</p>
                  <p><strong>Published:</strong> {book.published}</p>
                  <p><strong>ISBN:</strong> {book.isbn}</p>
                  <p><strong>Price:</strong> {book.price}</p>
                  <p><strong>Picture URL:</strong> {book.pic}</p>
                  <p><strong>Author ID:</strong> {book.authorId}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 border-red-500 border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminBookTab;
