function AdminNavbar({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button
        className={`px-4 py-2 rounded hover:cursor-pointer ${activeTab === "Users" ? "text-mint border-mint border-2 font-bold scale-110" : "text-purple-500 border-purple-500 border-2"}`}
        onClick={() => setActiveTab("Users")}
      >
        Users
      </button>
      <button
        className={`px-4 py-2 rounded hover:cursor-pointer ${activeTab === "Authors" ? "text-mint border-mint border-2 font-bold scale-110" : "text-purple-500 border-purple-500 border-2"}`}
        onClick={() => setActiveTab("Authors")}
      >
        Authors
      </button>
      <button
        className={`px-4 py-2 rounded hover:cursor-pointer ${activeTab === "Books" ? "text-mint border-mint border-2 font-bold scale-110" : "text-purple-500 border-purple-500 border-2"}`}
        onClick={() => setActiveTab("Books")}
      >
        Books
      </button>
    </div>
  );
}

export default AdminNavbar;
