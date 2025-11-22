import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [ShowForm, setShowForm] = useState();

  const navigate = useNavigate

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        {ShowForm && <ProductForm/>}
        <button onClick={() => setShowForm(prev => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded"  

        >
          {ShowForm? "close form" : "Add New Product"}
        </button>
        <Link
        to="/admin/orders"
            // className="text-xl font-serif tracking-wide text-[#3C5A4C] border border-[#3C5A4C] px-4 py-1"
            className="bg-blue-600 text-white px-4 py-2 rounded"
         >Orders</Link>


      </div>
    </div>
  );
};

export default AdminDashboard;
