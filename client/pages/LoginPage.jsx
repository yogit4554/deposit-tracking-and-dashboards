import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-purple-700 text-white flex items-center justify-center flex-col p-10">
        <h1 className="text-3xl font-bold mb-4">Cash Management Dashboard</h1>
        <p className="text-center">Real-time Cash Reconciliation – Ensuring Accuracy & Transparency</p>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 shadow-lg rounded-xl w-96 space-y-4"
        >
          <h2 className="text-xl font-bold text-purple-700">Sign In to Your Dashboard</h2>
          <input
            type="email"
            placeholder="admin@123.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-orange-500 text-white py-2 w-full rounded">
            Login to dashboard
          </button>
          <div className="flex justify-between text-sm text-gray-500">
            <label>
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <span className="cursor-pointer">Forgot password</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
