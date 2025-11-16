// src/Components/LoginModal.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext";

const LoginModal = ({ isOpen, onClose }) => {
  const { setToken, setUser } = useContext(AppContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || data.error || "Login failed");
        return;
      }
      // Save token and user to context (and localStorage via AppContext effect)
      setToken(data.token);
      setUser(data.user);
      setCredentials({ email: "", password: "" });
      onClose();
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" 
      style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
    >
      <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Login to e-Wardrobe</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <strong>Demo credentials (dev only):</strong><br />
          email: <em>chiragdawra46@gmail.com</em><br />
          password: <em>password123</em>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;