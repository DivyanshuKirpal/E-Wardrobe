// src/Components/SignupModal.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

/**
 * SignupModal
 * - Calls POST /api/auth/register
 * - On success stores token & user and navigates to /closet
 */
const SignupModal = ({ isOpen, onClose }) => {
  const { setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || data.error || "Registration failed");
        setLoading(false);
        return;
      }
      setToken(data.token);
      setUser(data.user);
      onClose?.();
      navigate("/closet");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: "rgba(0,0,0,0.35)" }}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Create account</h3>
          <button onClick={() => { setError(""); onClose?.(); }} className="text-gray-500">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" required minLength={6} className="w-full px-3 py-2 border rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm</label>
            <input name="confirm" value={form.confirm} onChange={handleChange} type="password" required minLength={6} className="w-full px-3 py-2 border rounded-md" />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded-md disabled:opacity-60">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;