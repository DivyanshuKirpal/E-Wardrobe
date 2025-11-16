import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../Context/AppContext";

const UploadButton = ({
  onUploadCloth,
  onSaveOutfit,
  onSuggestion,
  onAccessories,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const { token, setItems, items, fetchItems } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPanelOpen && !event.target.closest(".upload-panel-container")) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPanelOpen]);

  // internal upload function: returns item or throws
  async function uploadFile(file) {
    if (!file) throw new Error("No file provided");
    if (!token) throw new Error("You must be logged in to upload");

    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("title", file.name);
      form.append("tags", ""); // you can change to accept tags

      const res = await fetch("http://localhost:5001/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || data.error || "Upload failed");
      }

      // Optimistically prepend new item to items list
      setItems(prev => [data, ...(prev || [])]);

      // also refresh items from server to ensure consistency (optional)
      // fetchItems();

      return data;
    } finally {
      setUploading(false);
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const item = await uploadFile(file);
      // call external handler if provided
      if (typeof onUploadCloth === "function") onUploadCloth(item);
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message || "Upload failed");
    } finally {
      // reset file input
      if (fileRef.current) fileRef.current.value = null;
      setIsPanelOpen(false);
    }
  };

  return (
    <div className="upload-panel-container fixed bottom-6 right-6 z-50">
      {/* Panel with Options */}
      {isPanelOpen && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-[200px] border-2 border-gray-100">
          <div className="space-y-3">
            <label className="block cursor-pointer">
              <input
                ref={fileRef}
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600">
                <i className="fa-solid fa-upload mr-3" />
                <span className="font-medium">{uploading ? "Uploading..." : "Upload Cloth"}</span>
              </div>
            </label>

            <button
              onClick={() => {
                if (typeof onSaveOutfit === "function") onSaveOutfit();
                setIsPanelOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 text-left"
            >
              <i className="fa-solid fa-bookmark mr-3" />
              <span className="font-medium">Save Outfit</span>
            </button>

            <button
              onClick={() => {
                if (typeof onSuggestion === "function") onSuggestion();
                setIsPanelOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-purple-50 transition text-gray-700 hover:text-purple-600 text-left"
            >
              <i className="fa-solid fa-lightbulb mr-3" />
              <span className="font-medium">Suggestion</span>
            </button>

            <button
              onClick={() => {
                if (typeof onAccessories === "function") onAccessories();
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
        onClick={() => setIsPanelOpen((s) => !s)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-14 h-14"
      >
        <i
          className={`fa-solid fa-plus text-xl transition-transform duration-300 ${
            isPanelOpen ? "rotate-45" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default UploadButton;