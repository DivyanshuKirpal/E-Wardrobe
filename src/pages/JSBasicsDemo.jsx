// src/pages/JSBasicsDemo.jsx
import React from "react";

const JSBasicsDemo = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">JS Basics Demo</h1>
        <p className="text-gray-600 mb-6">
          This is a small demo placeholder page. Replace this with your real demo content when ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Tip</h3>
            <p className="text-sm text-gray-500">Use this page to demonstrate JavaScript basics or small components.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Quick actions</h3>
            <p className="text-sm text-gray-500">Add interactive examples, playgrounds, or code snippets here.</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <small className="text-gray-400">Placeholder — remove when not needed.</small>
        </div>
      </div>
    </div>
  );
};

export default JSBasicsDemo;