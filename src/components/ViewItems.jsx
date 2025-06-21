"use client"

import { useState } from "react"
import ItemModal from "./ItemModal"

const ViewItems = ({ items, showToast }) => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">View Items</h2>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found. Add some items to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.coverImage || "/images/placeholder.png"}
                alt={item.name}
                className="w-full h-48 object-cover"
                onError={(e) => (e.target.src = "/images/placeholder.png")}
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} showToast={showToast} />
      )}
    </div>
  )
}

export default ViewItems
