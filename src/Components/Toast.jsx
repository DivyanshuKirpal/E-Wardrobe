// src/Components/Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠"
  };

  const colors = {
    success: "from-green-500 to-green-600",
    error: "from-red-500 to-red-600",
    info: "from-blue-500 to-blue-600",
    warning: "from-yellow-500 to-yellow-600"
  };

  return (
    <div className="fixed top-24 right-6 z-[300] animate-slide-in">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <div className="text-2xl">{icons[type]}</div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
