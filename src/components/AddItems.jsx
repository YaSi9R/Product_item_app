"use client"

import { useState } from "react"

const AddItems = ({ onAddItem, showToast }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [],
  })

  const [imagePreview, setImagePreview] = useState({
    cover: "",
    additional: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const itemTypes = ["Shirt", "Pant", "Shoes", "Sports Gear", "Accessories", "Other"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData((prev) => ({ ...prev, coverImage: base64 }))
        setImagePreview((prev) => ({ ...prev, cover: base64 }))
        showToast("Cover image uploaded successfully!", "success")
      } catch (error) {
        console.error("Error converting image to base64:", error)
        showToast("Error uploading image. Please try again.", "error")
      }
    }
  }

  const handleAdditionalImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setFormData((prev) => ({
          ...prev,
          additionalImages: [...prev.additionalImages, base64],
        }))
        setImagePreview((prev) => ({
          ...prev,
          additional: [...prev.additional, base64],
        }))
        showToast("Additional image uploaded successfully!", "success")
      } catch (error) {
        console.error("Error converting image to base64:", error)
        showToast("Error uploading image. Please try again.", "error")
      }
    }
  }

  const removeAdditionalImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }))
    setImagePreview((prev) => ({
      ...prev,
      additional: prev.additional.filter((_, i) => i !== index),
    }))
    showToast("Image removed successfully!", "success")
  }

  const removeCoverImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: "" }))
    setImagePreview((prev) => ({ ...prev, cover: "" }))
    showToast("Cover image removed successfully!", "success")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.description) {
      showToast("Please fill in all required fields.", "error")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newItem = {
        ...formData,
        coverImage: formData.coverImage || generatePlaceholderBase64("No Image"),
      }

      onAddItem(newItem)

      setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: "",
        additionalImages: [],
      })
      setImagePreview({
        cover: "",
        additional: [],
      })
    } catch (error) {
      showToast("Error adding item. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const generatePlaceholderBase64 = (text) => {
    const canvas = document.createElement("canvas")
    canvas.width = 300
    canvas.height = 300
    const ctx = canvas.getContext("2d")

    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, 300, 300)

    ctx.fillStyle = "#6b7280"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(text, 150, 150)

    return canvas.toDataURL("image/png")
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h2>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select item type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Item Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter item description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {imagePreview.cover ? (
                <div className="relative">
                  <img
                    src={imagePreview.cover || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">Click to upload cover image</span>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>

            {imagePreview.additional.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {imagePreview.additional.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-center">
                <label htmlFor="additional-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-500 font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add additional image</span>
                  </div>
                  <input
                    id="additional-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAdditionalImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Adding Item..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItems
