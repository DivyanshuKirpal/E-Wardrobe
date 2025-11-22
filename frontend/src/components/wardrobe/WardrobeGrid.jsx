export default function WardrobeGrid({ items, onItemClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => onItemClick(item)}
          className="card cursor-pointer hover:-translate-y-1"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
        </div>
      ))}
    </div>
  );
}
