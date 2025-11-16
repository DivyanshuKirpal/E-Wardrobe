// src/Components/LoginModal.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

/**
 * LoginModal
 * - Accepts email/password and calls /api/auth/login (backend).
 * - If the user types the legacy demo username "PID18" and password "pass123" it will
 *   fallback to a local demo login (no network).
 * - On success it sets token+user in AppContext and navigates to /closet.
 */
const LoginModal = ({ isOpen, onClose }) => {
  const { setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ identifier: "", password: "" }); // identifier = email or legacy username
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const loginWithFallback = (username) => {
    // legacy demo login support
    if (username === "PID18" && credentials.password === "pass123") {
      // create a demo token / user locally
      const demoToken = "local-demo-token"; // convenience token for dev
      const demoUser = { name: "PID18", email: "", _id: "local-PID18" };
      setToken(demoToken);
      setUser(demoUser);
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const identifier = credentials.identifier.trim();
    const password = credentials.password;

    // Legacy fallback (username/password) — keeps old demo behaviour
    if (!identifier.includes("@") && loginWithFallback(identifier)) {
      setLoading(false);
      onClose?.();
      navigate("/closet");
      return;
    }

    // Otherwise treat identifier as email and call backend
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || data.error || "Invalid credentials");
        setLoading(false);
        return;
      }
      // success: store token & user in context (AppContext persists to localStorage)
      setToken(data.token);
      setUser(data.user);

      onClose?.();
      // navigate to closet so protected route shows
      navigate("/closet");
    } catch (err) {
      console.error("Login error:", err);
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
          <h3 className="text-xl font-semibold">Login</h3>
          <button onClick={() => { setError(""); onClose?.(); }} className="text-gray-500">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or Username</label>
            <input
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              placeholder="you@example.com or PID18"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-3 text-sm text-gray-500">
          Demo credentials: <strong>PID18 / pass123</strong> (type PID18 in the first field) or use your registered email/password.
        </div>
      </div>
    </div>
  );
};

export default LoginModal;