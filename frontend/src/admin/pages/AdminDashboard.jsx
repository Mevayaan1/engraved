import React, { useState } from "react";
import ProductForm from "../components/ProductForm";
const AdminDashboard = () => {
  const [ShowForm, setShowForm] = useState();

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

      </div>
    </div>
  );
};

export default AdminDashboard;
