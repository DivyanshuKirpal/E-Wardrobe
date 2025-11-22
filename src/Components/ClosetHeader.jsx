// src/Components/ClosetHeader.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";

// Only import the login modal here as a fallback when NOT logged in.
// We purposely do NOT import SignupModal here so signup lives on landing/header.
import LoginModal from "./LoginModal.jsx";

const ClosetHeader = ({ onMenuClick, onLogout: onLogoutProp, searchQuery, onSearchChange }) => {
  const { token, user, setToken, setUser } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // fallback for unauthenticated users
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // clear context (AppProvider persists to localStorage)
    setToken?.(null);
    setUser?.(null);
    // call parent callback too (if provided)
    if (typeof onLogoutProp === "function") onLogoutProp();
    // navigate to home after logout
    navigate("/");
  };

  const avatarClick = () => {
    if (token) {
      // open profile dropdown for logged-in user
      setIsMenuOpen((s) => !s);
    } else {
      // fallback: if someone is unauthenticated, show login modal
      setShowLogin(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo and Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                  E-Wardrobe
                </span>
              </div>
            </div>

            {/* Center - Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your wardrobe..."
                  value={searchQuery || ""}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange?.("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="relative p-3 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:shadow-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Profile Avatar */}
              <button
                onClick={avatarClick}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                title={token ? `Signed in as ${user?.name || user?.email || "Account"}` : "Sign in"}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar menu - opens from left side */}
        {isMenuOpen && token && (
          <div ref={menuRef} className="fixed left-0 top-[73px] w-72 h-[calc(100vh-73px)] bg-white shadow-2xl border-r border-gray-200 z-[100] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Signed in as</div>
                  <div className="font-semibold text-gray-800">{user?.name || user?.email || "User"}</div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Navigation</div>
              <button onClick={() => { onMenuClick("closet"); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 rounded-lg group">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                <span className="font-medium text-gray-700 group-hover:text-purple-600">My Closet</span>
              </button>
              <button onClick={() => { onMenuClick("favorites"); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 rounded-lg group">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Favorites</span>
              </button>
              <button onClick={() => { onMenuClick("stats"); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 rounded-lg group">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Statistics</span>
              </button>
              <button onClick={() => { onMenuClick("outfits"); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 rounded-lg group">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11z M12 22l5.5-9h-11z"/></svg>
                <span className="font-medium text-gray-700 group-hover:text-purple-600">Outfits</span>
              </button>
            </div>

            <hr className="my-2 mx-4" />

            <div className="p-4">
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center gap-3 rounded-lg group">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                <span className="font-medium text-red-600">Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* If NOT logged in and avatar clicked, we show the login modal fallback */}
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </header>
    </>
  );
};

export default ClosetHeader;