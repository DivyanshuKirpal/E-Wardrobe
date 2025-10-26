import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClosetHeader = ({ onMenuClick, onLogout }) => {
  const [searchValue, setSearchValue] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 left-0 z-50">
      {/* Left: 3-Line Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-3 transition hover:scale-110"
        style={{ color: "#8b5cf6" }}
      >
        <i className="fa-solid fa-bars text-3xl font-bold" />
      </button>

      {/* Center: Logo + Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-3xl mx-6">
        {/* E-Wardrobe Logo */}
        <button
          onClick={() => navigate("/closet")}
          className="font-bold text-xl hover:opacity-80 transition whitespace-nowrap"
          style={{ color: "#8b5cf6" }}
        >
          e-wardrobe
        </button>

        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="SEARCH"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-white font-semibold focus:outline-none"
            style={{
              backgroundColor: "#CFC8F3",
              placeholderColor: "#FFF"
            }}
          />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-2">
        <button 
          className="p-3 transition hover:scale-110"
          style={{ color: "#8b5cf6" }}
          title="Add Item"
        >
          <i className="fa-solid fa-plus text-3xl font-bold" />
        </button>
        <button 
          className="p-3 transition hover:scale-110"
          style={{ color: "#8b5cf6" }}
          title="View Grid"
        >
          <i className="fa-solid fa-th text-3xl font-bold" />
        </button>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-300 hover:border-purple-500 transition cursor-pointer"
          >
            <img
              src="https://i.pinimg.com/736x/8b/e6/a5/8be6a536d461d8462d3e1b72f3e7b1e3.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  console.log("View Profile");
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition"
              >
                <i className="fa-solid fa-user mr-3" />
                Profile
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  console.log("Settings");
                }}
                className="w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition"
              >
                <i className="fa-solid fa-gear mr-3" />
                Settings
              </button>
              <div className="border-t border-gray-200" />
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  if (onLogout) {
                    onLogout();
                    // Small delay to ensure state updates before navigation
                    setTimeout(() => {
                      navigate("/");
                    }, 0);
                  }
                }}
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition"
              >
                <i className="fa-solid fa-right-from-bracket mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ClosetHeader;
