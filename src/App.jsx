"use client"

import { useState, useEffect } from "react"
import ViewItems from "./components/ViewItems"
import AddItems from "./components/AddItems"
import Toast from "./components/Toast"
import "./App.css"

// Function to generate a simple base64 placeholder image
const generatePlaceholderBase64 = (text, width = 300, height = 300) => {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  // Fill background
  ctx.fillStyle = "#f3f4f6"
  ctx.fillRect(0, 0, width, height)

  // Add text
  ctx.fillStyle = "#6b7280"
  ctx.font = "16px Arial"
  ctx.textAlign = "center"
  ctx.fillText(text, width / 2, height / 2)

  return canvas.toDataURL("image/png")
}

// Function to convert image URL to base64
const convertImageToBase64 = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Error converting image to base64:", error)
    return null
  }
}

const getInitialItems = async () => {
  if (typeof window !== "undefined") {
    try {
      // Convert image URLs to base64
      const tshirtCover = await convertImageToBase64(
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )
      const tshirtImg2 = await convertImageToBase64(
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      )
      const tshirtImg3 = await convertImageToBase64(
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )

      const jeansCover = await convertImageToBase64(
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )
      const jeansImg2 = await convertImageToBase64(
        "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )
      const jeansImg3 = await convertImageToBase64(
        "https://plus.unsplash.com/premium_photo-1681216118271-126b28fecfe5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
      )

      const sneakersCover = await convertImageToBase64(
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )
      const sneakersImg2 = await convertImageToBase64(
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )
      const sneakersImg3 = await convertImageToBase64(
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      )

      return [
        {
          id: 1,
          name: "Classic Crew Neck T-Shirts",
          type: "Shirt",
          description:
            "Premium crew neck t-shirts in beautiful teal color. Made from soft, breathable cotton blend fabric. Perfect for casual wear and layering. Available in multiple sizes with a comfortable, relaxed fit.",
          coverImage: tshirtCover || generatePlaceholderBase64("T-Shirt"),
          additionalImages: [
            tshirtImg2 || generatePlaceholderBase64("T-Shirt 2"),
            tshirtImg3 || generatePlaceholderBase64("T-Shirt 3"),
          ],
        },
        {
          id: 2,
          name: "Blue Denim Jeans",
          type: "Pant",
          description: "Classic blue denim jeans with a modern slim fit. Durable and stylish for any occasion.",
          coverImage: jeansCover || generatePlaceholderBase64("Jeans"),
          additionalImages: [
            jeansImg2 || generatePlaceholderBase64("Jeans 2"),
            jeansImg3 || generatePlaceholderBase64("Jeans 3"),
          ],
        },
        {
          id: 3,
          name: "Running Sneakers",
          type: "Shoes",
          description: "Lightweight running shoes with excellent cushioning and support for your daily runs.",
          coverImage: sneakersCover || generatePlaceholderBase64("Sneakers"),
          additionalImages: [
            sneakersImg2 || generatePlaceholderBase64("Sneakers 2"),
            sneakersImg3 || generatePlaceholderBase64("Sneakers 3"),
          ],
        },
      ]
    } catch (error) {
      console.error("Error loading images:", error)
      // Fallback to placeholder images if loading fails
      return [
        {
          id: 1,
          name: "Classic Crew Neck T-Shirts",
          type: "Shirt",
          description:
            "Premium crew neck t-shirts in beautiful teal color. Made from soft, breathable cotton blend fabric.",
          coverImage: generatePlaceholderBase64("T-Shirt"),
          additionalImages: [generatePlaceholderBase64("T-Shirt 2"), generatePlaceholderBase64("T-Shirt 3")],
        },
        {
          id: 2,
          name: "Blue Denim Jeans",
          type: "Pant",
          description: "Classic blue denim jeans with a modern slim fit. Durable and stylish for any occasion.",
          coverImage: generatePlaceholderBase64("Jeans"),
          additionalImages: [generatePlaceholderBase64("Jeans 2"), generatePlaceholderBase64("Jeans 3")],
        },
        {
          id: 3,
          name: "Running Sneakers",
          type: "Shoes",
          description: "Lightweight running shoes with excellent cushioning and support for your daily runs.",
          coverImage: generatePlaceholderBase64("Sneakers"),
          additionalImages: [generatePlaceholderBase64("Sneakers 2"), generatePlaceholderBase64("Sneakers 3")],
        },
      ]
    }
  }
  return []
}

function App() {
  const [currentPage, setCurrentPage] = useState("view")
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  })

  // Load items from localStorage on component mount
  useEffect(() => {
    const loadItems = async () => {
      // Always load default items first
      const defaultItems = await getInitialItems()

      // Then check for saved user items
      const savedItems = localStorage.getItem("itemsData")
      if (savedItems) {
        try {
          const userItems = JSON.parse(savedItems)
          // Filter out default items (IDs 1, 2, 3) and keep only user-added items
          const userAddedItems = userItems.filter((item) => item.id > 3)
          // Combine default items with user-added items
          setItems([...defaultItems, ...userAddedItems])
        } catch (error) {
          console.error("Error loading items from localStorage:", error)
          setItems(defaultItems)
        }
      } else {
        setItems(defaultItems)
      }
      setIsLoading(false)
    }

    loadItems()
  }, [])

  // Save items to localStorage whenever items change
  useEffect(() => {
    if (items.length > 0 && !isLoading) {
      localStorage.setItem("itemsData", JSON.stringify(items))
    }
  }, [items, isLoading])

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    })
  }

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }))
  }

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now(), // This ensures user items have IDs > 3
    }
    setItems((prev) => [...prev, item])

    // Show success toast
    showToast("Item successfully added!")

    // Redirect to view items page after a short delay
    setTimeout(() => {
      setCurrentPage("view")
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Items Manager</h1>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage("view")}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  currentPage === "view"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                View Items
              </button>
              <button
                onClick={() => setCurrentPage("add")}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  currentPage === "add"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Add Items
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentPage === "view" ? (
          <ViewItems items={items} showToast={showToast} />
        ) : (
          <AddItems onAddItem={addItem} showToast={showToast} />
        )}
      </main>
    </div>
  )
}

export default App
