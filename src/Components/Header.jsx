// src/Components/Header.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import SignupModal from "./SignupModal.jsx";
import { AppContext } from "../Context/AppContext.jsx";

const Header = ({ isLoggedIn, onLogin, onLogout, onNavigateToCloset }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Helper: open signup from CTA
  const handleGetStarted = () => {
    // if already logged in — go to closet
    if (token) {
      onNavigateToCloset?.();
    } else {
      setShowSignup(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
              </div>
              <span className="font-bold text-lg text-gray-800">E-Wardrobe</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-4 items-center text-sm text-gray-600">
              <button onClick={() => navigate("/")} className="hover:text-gray-900">Home</button>
              <button onClick={() => navigate("/features")} className="hover:text-gray-900">Features</button>
              <button onClick={() => navigate("/pricing")} className="hover:text-gray-900">Pricing</button>
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={handleGetStarted} className="bg-white text-indigo-600 px-4 py-2 rounded-lg border hover:bg-gray-50">
                Get Started
              </button>

              {/* Avatar / Account button */}
              <button
                onClick={() => {
                  // If logged in, go to closet; else show login
                  if (token) {
                    onNavigateToCloset?.();
                  } else {
                    setShowLogin(true);
                  }
                }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white shadow-md"
                title={token ? "Open closet" : "Sign in"}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
              </button>
            </div>
          </div>

          {/* small menu for mobile */}
        </div>

        {/* dropdown menu (same behaviour as ClosetHeader but simpler) */}
        {isMenuOpen && (
          <div ref={menuRef} className="absolute left-6 top-20 w-56 bg-white rounded-lg shadow-lg z-50">
            <button onClick={() => { setShowLogin(true); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Login</button>
            <button onClick={() => { setShowSignup(true); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Sign up</button>
            <hr />
            <button onClick={() => { onNavigateToCloset?.(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Closet</button>
          </div>
        )}
      </header>

      {/* Render Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal isOpen={showSignup} onClose={() => setShowSignup(false)} />
    </>
  );
};

export default Header;