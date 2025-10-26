import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-gray-600 hover:text-gray-900">
        <i className="fa-solid fa-ellipsis-vertical text-2xl" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          <button onClick={() => navigate("/stats")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Stats</button>
          <button onClick={() => navigate("/favorites")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Favorites</button>
          <button onClick={() => navigate("/outfits")} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">Outfits</button>
        </div>
      )}
    </div>
  );
};

export default FeatureMenu;
