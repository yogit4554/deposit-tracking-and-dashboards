// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("admin@123.com");
  const [password, setPassword] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic auth logic
    if (email === "admin@123.com" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-purple-800 text-white flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-2">Cash Management Dashboard</h1>
        <p>Real-time Reconciliation – Transparency & Accuracy</p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-[350px] space-y-4">
          <h2 className="text-xl font-semibold text-purple-800">Sign In to Dashboard</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="admin@123.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Login to dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
