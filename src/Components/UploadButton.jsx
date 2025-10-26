import React, { useState, useEffect } from "react";

const UploadButton = ({
  onUploadCloth,
  onSaveOutfit,
  onSuggestion,
  onAccessories,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPanelOpen && !event.target.closest('.upload-panel-container')) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPanelOpen]);

  return (
    <div className="upload-panel-container fixed bottom-6 right-6 z-50">
      {/* Panel with Options */}
      {isPanelOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-[200px] border-2 border-gray-100">
          <div className="space-y-3">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={(e) => {
                  onUploadCloth(e);
                  setIsPanelOpen(false);
                }}
              />
              <div className="flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600">
                <i className="fa-solid fa-upload mr-3" />
                <span className="font-medium">Upload Cloth</span>
              </div>
            </label>

            <button
              onClick={() => {
                onSaveOutfit();
                setIsPanelOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 text-left"
            >
              <i className="fa-solid fa-bookmark mr-3" />
              <span className="font-medium">Save Outfit</span>
            </button>

            <button
              onClick={() => {
                onSuggestion();
                setIsPanelOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 text-left"
            >
              <i className="fa-solid fa-lightbulb mr-3" />
              <span className="font-medium">Suggestion</span>
            </button>

            <button
              onClick={() => {
                onAccessories();
                setIsPanelOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 text-left"
            >
              <i className="fa-solid fa-jewelry mr-3" />
              <span className="font-medium">Accessories</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Upload Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-14 h-14"
      >
        <i className={`fa-solid fa-plus text-xl transition-transform duration-300 ${isPanelOpen ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
};

export default UploadButton;
