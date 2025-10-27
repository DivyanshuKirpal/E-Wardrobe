import React from "react";

const ClosetGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Example items in the grid */}
      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <img
          src="https://via.placeholder.com/150"
          alt="Clothing Item"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900">Clothing Item 1</h3>
        <p className="text-gray-600">Description of the item</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <img
          src="https://via.placeholder.com/150"
          alt="Clothing Item"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900">Clothing Item 2</h3>
        <p className="text-gray-600">Description of the item</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <img
          src="https://via.placeholder.com/150"
          alt="Clothing Item"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900">Clothing Item 3</h3>
        <p className="text-gray-600">Description of the item</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
        <img
          src="https://via.placeholder.com/150"
          alt="Clothing Item"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-900">Clothing Item 4</h3>
        <p className="text-gray-600">Description of the item</p>
      </div>
    </div>
  );
};

export default ClosetGrid;