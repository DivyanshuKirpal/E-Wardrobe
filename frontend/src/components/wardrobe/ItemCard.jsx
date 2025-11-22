import { Heart, Trash2 } from 'lucide-react';

export default function ItemCard({ item, onFavorite, onDelete }) {
  return (
    <div className="card group">
      <div className="relative mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <button
          onClick={() => onFavorite(item._id)}
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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onDelete(item._id)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
