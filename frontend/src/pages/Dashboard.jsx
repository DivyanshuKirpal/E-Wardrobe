import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus, Grid, Heart, Settings } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, favorites: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadStats();
  }, [user, navigate]);

  const loadStats = async () => {
    try {
      const res = await api.get('/wardrobe');
      const items = res.data.data;
      setStats({
        total: items.length,
        favorites: items.filter(item => item.isFavorite).length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold gradient-text">E-Wardrobe</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your digital wardrobe</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Items</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <Grid className="w-12 h-12 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Favorites</p>
                <p className="text-3xl font-bold mt-1">{stats.favorites}</p>
              </div>
              <Heart className="w-12 h-12 text-red-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="text-3xl font-bold mt-1">6</p>
              </div>
              <Settings className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/wardrobe" className="card hover:-translate-y-2 group">
            <Grid className="w-12 h-12 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">My Wardrobe</h3>
            <p className="text-gray-600">View and manage all your clothing items</p>
          </Link>

          <Link to="/wardrobe?action=add" className="card hover:-translate-y-2 group bg-gradient-to-br from-primary-500 to-purple-600 text-white">
            <Plus className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Add New Item</h3>
            <p className="opacity-90">Upload new clothing items to your wardrobe</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
