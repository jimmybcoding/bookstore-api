import { useState } from 'react';
import AddUserForm from './addUserForm';
import { API_URL } from '../../api';

function AdminUserTab() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleGetUsers = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } 
  };

  const handleEdit = (id) => setEditingId(id);

  const handleChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleSave = async (id) => {
    const user = users.find((u) => u.id === id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error('Failed to update user');
      setEditingId(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-mint mb-4">Users CRUD Operations</h2>

      <button
        onClick={handleGetUsers}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        GET Users
      </button>
      
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Add New User
      </button>
      {showAddForm && <AddUserForm />}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {users.length > 0 && (
        <ul className="mt-6 space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-col gap-2 border-b border-mint pb-4"
            >
              {editingId === user.id ? (
                <>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleChange(user.id, 'name', e.target.value)}
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleChange(user.id, 'email', e.target.value)}
                    className=" text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSave(user.id)}
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
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

export default AdminUserTab;
