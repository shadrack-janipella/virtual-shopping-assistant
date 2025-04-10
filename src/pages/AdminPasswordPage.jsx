// src/pages/AdminPasswordPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminPasswordPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctPassword = "admin123";  // You can change this password to anything you prefer

    if (password === correctPassword) {
      localStorage.setItem("isAdmin", "true");  // Store password validation in localStorage
      toast.success("Password correct! Access granted.");
      navigate("/admin");  // Navigate to admin page
    } else {
      toast.error("Incorrect password. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Enter Admin Password</h2>
        <input
          type="password"
          placeholder="Admin Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPasswordPage;
