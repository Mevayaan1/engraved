// AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-3"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-3"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button
        className="bg-[#234946] text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
