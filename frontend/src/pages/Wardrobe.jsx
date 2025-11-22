import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Plus, Upload, Heart, Trash2, X } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Wardrobe() {
  const { user, logout } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadItems();
  }, [user, navigate]);

  const loadItems = async () => {
    try {
      const res = await api.get('/wardrobe');
      setItems(res.data.data);
    } catch (error) {
      console.error('Error loading items:', error);
      toast.error('Failed to load wardrobe items');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/wardrobe/${id}`);
      toast.success('Item deleted successfully');
      loadItems();
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await api.put(`/wardrobe/${id}/favorite`);
      loadItems();
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold gradient-text">E-Wardrobe</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-500">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-500"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Wardrobe</h1>
            <p className="text-gray-600">Manage your clothing collection</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your wardrobe...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items yet</h3>
            <p className="text-gray-600 mb-4">Start building your digital wardrobe</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item._id} className="card group">
                <div className="relative mb-4">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                  <button
                    onClick={() => toggleFavorite(item._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2 capitalize">{item.category}</p>
                {item.color && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mb-2">
                    {item.color}
                  </span>
                )}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal (simplified for now) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add New Item</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Item upload functionality will be implemented with file upload support.
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="btn-secondary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
