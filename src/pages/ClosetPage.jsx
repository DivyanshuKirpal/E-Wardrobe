// src/pages/ClosetPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import wardrobeDB from "../services/wardrobeDB.js";
import HuggingFaceAPI from "../services/huggingFaceAPI.js";
import { AppContext } from "../Context/AppContext";

/**
 * Complete ClosetPage with robust Trash feature and persistence fallbacks.
 * - Uses AppContext (token, items, setItems, fetchItems).
 * - Uses local wardrobeDB when logged out.
 * - Trash modal functions: handleMoveToTrash, handleRestoreItem, handlePermanentDelete, handleClearTrash.
 *
 * Paste this file into src/pages/ClosetPage.jsx
 */

const ClosetPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { token, items: ctxItems, setItems, fetchItems } = useContext(AppContext);

  // Local state
  const [items, setLocalItems] = useState([]); // view-level items (mirrors ctxItems when logged in)
  const [trashedItems, setTrashedItems] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedOutfitItems, setSelectedOutfitItems] = useState({
    upper: null,
    lower: null,
    bottom: null
  });

  // AI processing states (kept from original)
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState("");
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [styleResolver, setStyleResolver] = useState(null);

  // On mount: load local DB/trash; if token present, fetch server items
  useEffect(() => {
    loadTrashedItems();
    if (token) {
      // when logged in, rely on server items via AppContext.fetchItems()
      fetchItems();
    } else {
      // logged out: load local wardrobe
      loadLocalItems();
    }
    // sync ctxItems -> local view whenever ctxItems changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    // If authenticated, show server items from context; otherwise use local items
    if (token) {
      setLocalItems(ctxItems || []);
    }
  }, [ctxItems, token]);

  // -----------------------
  // Local/offline data helpers
  // -----------------------
  const loadLocalItems = () => {
    const username = "PID18"; // <<< NOTE: change this if you support multi users
    const upper = wardrobeDB.getWardrobeItems(username, 'upper') || [];
    const lower = wardrobeDB.getWardrobeItems(username, 'lower') || [];
    const bottom = wardrobeDB.getWardrobeItems(username, 'bottom') || [];
    const accessories = wardrobeDB.getWardrobeItems(username, 'accessories') || [];
    const merged = [...upper, ...lower, ...bottom, ...accessories];
    setLocalItems(merged);
    // Mirror to context if there's no server token (keeps UI code consistent)
    if (!token && typeof setItems === "function") {
      setItems(merged);
    }
  };

  // -----------------------
  // Trash helpers (core fixes)
  // -----------------------
  const loadTrashedItems = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("trashedItems")) || [];
      setTrashedItems(saved);
    } catch (err) {
      console.error("Failed to load trashed items:", err);
      setTrashedItems([]);
    }
  };

  // IMPORTANT: called when user clicks the trash (floating button)
  // Opens modal — no navigation, no route change (prevents blank page)
  const openTrashModal = () => {
    loadTrashedItems();
    setShowTrashModal(true);
  };

  // Move an item to trash (works for local and server items)
  const handleMoveToTrash = async (item) => {
    try {
      // Save trashed record locally (so trash persists across reloads)
      const current = JSON.parse(localStorage.getItem("trashedItems")) || [];
      const trashedRecord = {
        ...item,
        trashedAt: new Date().toISOString()
      };
      current.push(trashedRecord);
      localStorage.setItem("trashedItems", JSON.stringify(current));
      setTrashedItems(current);

      // Remove from local wardrobeDB (if local item)
      const username = "PID18";
      if (!token) {
        wardrobeDB.removeItemFromWardrobe(username, item.category, item.id);
        loadLocalItems();
      } else {
        // If using server items: remove from context locally. We do NOT delete from server permanently here.
        if (typeof setItems === "function") {
          setItems(prev => prev.filter(it => (it._id || it.id) !== (item._id || item.id)));
        }
        // Optionally: you could call an endpoint to mark item as "trashed" in DB.
      }
    } catch (err) {
      console.error("handleMoveToTrash error:", err);
      alert("Could not move item to trash.");
    }
  };

  // Restore trashed item (puts it back into wardrobeDB local copy).
  // If item came from server you'd want to re-upload or call server to restore.
  const handleRestoreItem = (item) => {
    try {
      const remaining = (trashedItems || []).filter(t => (t._id || t.id) !== (item._id || item.id));
      localStorage.setItem("trashedItems", JSON.stringify(remaining));
      setTrashedItems(remaining);

      const username = "PID18";
      const restoredItem = { ...item };
      delete restoredItem.trashedAt;
      // If item has server id use local fallback to restore in local DB
      wardrobeDB.addItemToWardrobe(username, item.category || "upper", restoredItem);

      // refresh local view
      if (!token) loadLocalItems();
      else {
        // if logged in you might want to re-fetch items from server
        fetchItems();
      }
    } catch (err) {
      console.error("handleRestoreItem error:", err);
      alert("Could not restore item.");
    }
  };

  // Permanently delete a single trashed item
  const handlePermanentDelete = (item) => {
    try {
      if (!confirm("Are you sure you want to permanently delete this item?")) return;
      const remaining = (trashedItems || []).filter(t => (t._id || t.id) !== (item._id || item.id));
      localStorage.setItem("trashedItems", JSON.stringify(remaining));
      setTrashedItems(remaining);
      // If item exists in local DB remove it (safety)
      const username = "PID18";
      if (!token) wardrobeDB.removeItemFromWardrobe(username, item.category, item.id);
      // If server-side permanent delete needed -> implement API call to DELETE /api/items/:id
    } catch (err) {
      console.error("handlePermanentDelete error:", err);
      alert("Could not delete item.");
    }
  };

  // Clear all trashed items (this is the fix for the missing function)
  const handleClearTrash = () => {
    try {
      if (!confirm("Are you sure you want to permanently delete all items in trash?")) return;
      localStorage.setItem("trashedItems", JSON.stringify([]));
      setTrashedItems([]);
      // optionally: clean local DB or instruct server to purge trash records if you implement server trash
    } catch (err) {
      console.error("handleClearTrash error:", err);
      alert("Could not clear trash.");
    }
  };

  // -----------------------
  // Upload / AI helpers (kept minimal)
  // -----------------------
  const dataURLToBlob = (dataURL) => {
    const [header, data] = dataURL.split(",");
    const isBase64 = header.indexOf("base64") >= 0;
    const mimeMatch = header.match(/data:([^;]+);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    if (isBase64) {
      const binary = atob(data);
      const len = binary.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) arr[i] = binary.charCodeAt(i);
      return new Blob([arr], { type: mime });
    } else {
      const uint8 = new TextEncoder().encode(decodeURIComponent(data));
      return new Blob([uint8], { type: mime });
    }
  };

  const uploadToServer = async (fileOrBlob, filename, category = "") => {
    if (!token) throw new Error("Not authenticated");
    const form = new FormData();
    let fileToSend = fileOrBlob;
    if (!(fileOrBlob instanceof File)) {
      fileToSend = new File([fileOrBlob], filename || `upload-${Date.now()}.png`, { type: fileOrBlob.type || "image/png" });
    }
    form.append("image", fileToSend);
    form.append("title", filename || fileToSend.name || "upload");
    form.append("tags", category);
    form.append("category", category);

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
    data.category = category;
    return data;
  };

  const saveToWardrobe = async (category, imageUrlOrDataURI, fileName) => {
    if (token) {
      try {
        if (typeof imageUrlOrDataURI === "string" && imageUrlOrDataURI.startsWith("data:")) {
          const blob = dataURLToBlob(imageUrlOrDataURI);
          const uploaded = await uploadToServer(blob, fileName || "processed.png", category);
          // Add to context items
          if (typeof setItems === "function") setItems(prev => [uploaded, ...(prev || [])]);
          return uploaded;
        } else if (typeof imageUrlOrDataURI === "string" && /^https?:\/\//i.test(imageUrlOrDataURI)) {
          try {
            const resp = await fetch(imageUrlOrDataURI);
            const blob = await resp.blob();
            const uploaded = await uploadToServer(blob, fileName || "image.png", category);
            if (typeof setItems === "function") setItems(prev => [uploaded, ...(prev || [])]);
            return uploaded;
          } catch (err) {
            console.warn("failed to fetch external image, falling back to local save:", err);
            const localItem = { id: Date.now(), name: `${category} - ${fileName}`, image: imageUrlOrDataURI, category };
            wardrobeDB.addItemToWardrobe("PID18", category, localItem);
            loadLocalItems();
            return localItem;
          }
        } else {
          const localItem = { id: Date.now(), name: `${category} - ${fileName || "file"}`, image: imageUrlOrDataURI, category };
          wardrobeDB.addItemToWardrobe("PID18", category, localItem);
          loadLocalItems();
          return localItem;
        }
      } catch (err) {
        console.error("saveToWardrobe (server) failed:", err);
        const localItem = { id: Date.now(), name: `${category} - ${fileName || "file"}`, image: imageUrlOrDataURI, category };
        wardrobeDB.addItemToWardrobe("PID18", category, localItem);
        loadLocalItems();
        return localItem;
      }
    } else {
      const username = "PID18";
      const entry = { id: Date.now(), name: `${category.charAt(0).toUpperCase() + category.slice(1)} - ${fileName}`, image: imageUrlOrDataURI, category };
      wardrobeDB.addItemToWardrobe(username, category, entry);
      loadLocalItems();
      return entry;
    }
  };

  // AI flow with style selection (kept)
  const showStyleSelection = () => {
    setShowStyleModal(true);
    return new Promise((resolve) => {
      setStyleResolver(() => resolve);
    });
  };

  const handleStyleSelect = (style) => {
    if (styleResolver) styleResolver(style);
    setShowStyleModal(false);
  };

  const handleAddItem = (category) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const originalImage = event.target.result;
          const styleChoice = await showStyleSelection();

          if (styleChoice === "original") {
            if (token) {
              try {
                const uploaded = await uploadToServer(file, file.name, category);
                if (typeof setItems === "function") setItems(prev => [uploaded, ...(prev || [])]);
              } catch (err) {
                console.error("upload original failed:", err);
                alert("Upload failed. Saving locally.");
                await saveToWardrobe(category, originalImage, file.name);
              }
            } else {
              await saveToWardrobe(category, originalImage, file.name);
            }
            return;
          }

          setIsProcessing(true);
          setProcessingProgress(`Converting to ${styleChoice}...`);

          try {
            let processedDataUrl;
            switch (styleChoice) {
              case "cartoon":
                processedDataUrl = await HuggingFaceAPI.transformToCartoon(file);
                break;
              case "anime":
                processedDataUrl = await HuggingFaceAPI.transformToAnime(file);
                break;
              case "remove-bg":
                processedDataUrl = await HuggingFaceAPI.removeBackground(file);
                break;
              default:
                processedDataUrl = originalImage;
            }

            await saveToWardrobe(category, processedDataUrl, file.name);
          } catch (error) {
            console.error("AI processing failed:", error);
            alert("AI processing failed. Saving original image instead.");
            await saveToWardrobe(category, originalImage, file.name);
          } finally {
            setIsProcessing(false);
            setProcessingProgress("");
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload error:", error);
        setIsProcessing(false);
      }
    };

    input.click();
  };

  // Drag & outfit helpers
  const handleDragStart = (e, item) => e.dataTransfer.setData("item", JSON.stringify(item));
  const handleReset = () => setSelectedOutfitItems({ upper: null, lower: null, bottom: null });

  const handleSaveOutfit = () => {
    if (selectedOutfitItems.upper || selectedOutfitItems.lower || selectedOutfitItems.bottom) {
      const outfits = JSON.parse(localStorage.getItem("savedOutfits")) || [];
      outfits.push({ id: Date.now(), items: selectedOutfitItems, createdAt: new Date().toISOString() });
      localStorage.setItem("savedOutfits", JSON.stringify(outfits));
      alert("Outfit saved successfully!");
    }
  };

  const getCategoryItems = (category) => {
    return (token ? (ctxItems || []) : (items || []))
      .filter(item => {
        const cat = item.category || item?.metadata?.category;
        if (cat) return cat.toLowerCase() === category.toLowerCase();
        if (item.tags && item.tags.includes(category.toLowerCase())) return true;
        return false;
      });
  };

  const totalOutfits = JSON.parse(localStorage.getItem("savedOutfits"))?.length || 0;
  const favoritesCount = (token ? (ctxItems || []) : (items || [])).filter(item => item.isFavorite).length;

  // keep localItems state in sync when not authenticated
  useEffect(() => {
    if (!token) loadLocalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <ClosetHeader onMenuClick={(p) => navigate(`/${p}`)} onLogout={onLogout} />

      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        {/* Left Section */}
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Try-On Avatar</h2>
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl h-[500px] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Drag items here to try on</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleReset} className="flex-1 ...">Reset</button>
              <button onClick={handleSaveOutfit} className="flex-1 ...">Save Outfit</button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{(token ? (ctxItems || []) : (items || [])).length}</div>
                <div className="text-sm text-gray-500 mt-1">Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{totalOutfits}</div>
                <div className="text-sm text-gray-500 mt-1">Outfits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{favoritesCount}</div>
                <div className="text-sm text-gray-500 mt-1">Favorites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Wardrobe */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-700">My Wardrobe</h2>
              <p className="text-sm text-gray-500">Click + on each category to add items</p>
            </div>

            {/* Categories: Upper / Lower / Bottom */}
            {["upper", "lower", "bottom"].map((cat) => (
              <div key={cat} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium shadow-md capitalize">
                    {cat}
                  </button>
                  <button onClick={() => handleAddItem(cat)} className="w-8 h-8 bg-green-500 text-white rounded-full ...">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {getCategoryItems(cat).map((item) => (
                    <div key={item._id || item.id} draggable onDragStart={(e) => handleDragStart(e, item)} className="bg-gray-50 rounded-2xl overflow-hidden cursor-move hover:shadow-lg transition-all group relative">
                      <div className="aspect-square overflow-hidden">
                        <img src={item.imageUrl || item.image || "/placeholder-shirt.jpg"} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <button onClick={() => handleMoveToTrash(item)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                      <div className="p-3">
                        <p className="font-medium text-sm text-gray-800 truncate">{item.name || item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Floating Trash Button */}
      <button onClick={openTrashModal} className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group">
        <svg className="w-7 h-7" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        {trashedItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center justify-center">{trashedItems.length}</span>
        )}
      </button>

      {/* Trash Modal */}
      {showTrashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Trash</h2>
              <div className="flex gap-3">
                {trashedItems.length > 0 && (
                  <button onClick={handleClearTrash} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                    Clear All
                  </button>
                )}
                <button onClick={() => setShowTrashModal(false)} className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center">
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {trashedItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Trash is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {trashedItems.map((item) => (
                    <div key={item._id || item.id} className="bg-gray-50 rounded-2xl overflow-hidden relative group">
                      <div className="aspect-square overflow-hidden">
                        <img src={item.image || item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(item.trashedAt).toLocaleString()}</p>
                      </div>

                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <button onClick={() => handleRestoreItem(item)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">Restore</button>
                        <button onClick={() => handlePermanentDelete(item)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">{processingProgress}</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Style Selection Modal */}
      {showStyleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Image Style</h2>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleStyleSelect('original')} className="p-6 border-2 rounded-xl">Original</button>
              <button onClick={() => handleStyleSelect('cartoon')} className="p-6 border-2 rounded-xl">Cartoon</button>
              <button onClick={() => handleStyleSelect('anime')} className="p-6 border-2 rounded-xl">Anime</button>
              <button onClick={() => handleStyleSelect('remove-bg')} className="p-6 border-2 rounded-xl">Remove BG</button>
            </div>
            <button onClick={() => handleStyleSelect('original')} className="w-full mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosetPage;