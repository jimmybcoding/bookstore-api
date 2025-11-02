import Navbar from "../ui-components/navbar";
import Footer from "../ui-components/footer";
import { useState } from "react";
import AdminNavbar from "../ui-components/adminNavbar";
import AdminUserTab from "../ui-components/adminUserTab";
import AdminBookTab from "../ui-components/adminBookTab";
import AdminAuthorTab from "../ui-components/adminAuthorTab";

function Admin() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="min-h-screen text-white bg-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        <h1 className="text-4xl font-extrabold text-center text-mint mb-8 pt-8">
          Admin Page
        </h1>
        <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Users" && <AdminUserTab />}
        {activeTab === "Books" && <AdminBookTab />}
        {activeTab === "Authors" && <AdminAuthorTab />}
      </main>
      <Footer />
  </div>
  );
}

export default Admin;
