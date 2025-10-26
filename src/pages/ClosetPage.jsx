import React from "react";
import Header from "../Components/Header.jsx";
import ClosetGrid from "../Components/ClosetGrid.jsx";

const ClosetPage = ({ isLoggedIn, onLogout, onBackToLanding }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogin={() => {}} onLogout={onLogout} />
      
      <main className="pt-24">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">My Digital Closet</h1>
              <p className="text-gray-600">Manage and organize your wardrobe collection</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={onBackToLanding}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Back to Home
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Add Item
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-shirt text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">24</h3>
                  <p className="text-gray-600">Total Items</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-check-circle text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">18</h3>
                  <p className="text-gray-600">Outfits Created</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-star text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">12</h3>
                  <p className="text-gray-600">Favorites</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                  <i className="fa-solid fa-calendar text-cyan-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">7</h3>
                  <p className="text-gray-600">This Week</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Your Wardrobe</h2>
              <p className="text-gray-600 mt-1">Browse and manage your clothing items</p>
            </div>
            <div className="p-6">
              <ClosetGrid />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClosetPage;
