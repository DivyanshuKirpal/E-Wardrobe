import React, { useState } from "react";
import LoginModal from "./LoginModal";

const Header = ({ isLoggedIn, onLogin, onLogout, onNavigateToCloset }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (success) => {
    if (success) {
      onLogin();
    }
  };

  const handleClosetClick = () => {
    if (onNavigateToCloset) {
      onNavigateToCloset();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mr-3">
                <i className="fa-solid fa-shirt text-white text-lg"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">e-Wardrobe</h1>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              {["Features", "How It Works", "Reviews", "Pricing", "Blog", "About"].map((item, i) => (
                <a key={i} href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 font-medium">Welcome, PID18!</span>
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Logout
                </button>
                <button
                  onClick={handleClosetClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  My Closet
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Login
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Sign Up Free
                </button>
              </>
            )}
            <button className="lg:hidden text-gray-700">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;
