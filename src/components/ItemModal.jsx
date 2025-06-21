"use client"

import { useState } from "react"

const ItemModal = ({ item, onClose, showToast }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Combine cover image with additional images for carousel
  const allImages = [item.coverImage, ...item.additionalImages].filter((img) => img)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleEnquire = () => {
    // Close the modal first
    onClose()

    // Show toast message after a short delay to ensure modal is closed
    setTimeout(() => {
      showToast(`Enquiry sent for "${item.name}"! We'll get back to you soon.`, "success")
    }, 100)

    // Here you could implement email functionality
    console.log(`Enquiry for item: ${item.name}`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={allImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`${item.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-80 object-cover rounded-lg"
                />

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Image indicators */}
              {allImages.length > 1 && (
                <div className="flex justify-center space-x-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}

              {allImages.length > 1 && (
                <div className="text-center text-sm text-gray-500">
                  {currentImageIndex + 1} of {allImages.length}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Item Type</h3>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.type}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </div>

              {/* Enquire Button */}
              <div className="pt-4">
                <button
                  onClick={handleEnquire}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium text-lg transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
