import Navbar from "../ui components/navbar"
import Footer from "../ui components/footer"
import { useState } from "react"

function Admin() {
    const[users, setUsers] = useState([]);

    const handleGetUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setUsers(result);
            console.log(result);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    };

    return (
        <div className="min-h-screen text-white bg-black">
            <Navbar />
            <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
                Admin Page
            </h1> 

            <button onClick={handleGetUsers}>GET Users</button>
            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            )}
            <Footer />
        </div>
    )
}

export default Admin