"use client"

import { useState, useEffect } from "react"
import ViewItems from "./components/ViewItems"
import AddItems from "./components/AddItems"
import Toast from "./components/Toast"
import "./App.css"

const getDefaultItems = () => [
  {
    id: 1,
    name: "Classic Crew-Neck T-Shirts",
    type: "Shirt",
    description:
      "Premium crew-neck t-shirts in a beautiful teal colour. Soft, breathable cotton—that perfect go-to basic.",
    coverImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70",
    additionalImages: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=70",
    ],
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    type: "Pant",
    description: "Classic blue denim with a modern slim fit; durable and stylish for every day.",
    coverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=70",
    additionalImages: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=600&q=70",
      "https://plus.unsplash.com/premium_photo-1681216118271-126b28fecfe5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxhY2slMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 3,
    name: "Running Sneakers",
    type: "Shoes",
    description: "Lightweight runners with responsive cushioning—perfect for daily training.",
    coverImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=70",
    additionalImages: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=70",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=70",
    ],
  },
]


function App() {
  const [currentPage, setCurrentPage] = useState("view")
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  })


  useEffect(() => {
    const defaultItems = getDefaultItems()
    const savedRaw = localStorage.getItem("itemsData")
    let combined = defaultItems

    if (savedRaw) {
      try {
        const userItems = JSON.parse(savedRaw)
        combined = [...defaultItems, ...userItems]
      } catch (e) {
        console.error("localStorage parse error", e)
      }
    }

    setItems(combined)
    setIsLoading(false)
  }, [])


  useEffect(() => {
    if (!isLoading) {
      const userItems = items.filter((item) => item.id > 3)
      try {
        localStorage.setItem("itemsData", JSON.stringify(userItems))
      } catch (err) {
        console.warn("localStorage quota exceeded – clearing storage and retrying …")
        localStorage.clear()
        try {
          localStorage.setItem("itemsData", JSON.stringify(userItems))
        } catch {
        }
      }
    }
  }, [items, isLoading])

  const showToast = (message, type = "success") => setToast({ isVisible: true, message, type })
  const hideToast = () => setToast((t) => ({ ...t, isVisible: false }))

  const addItem = (newItem) => {
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }])
    showToast("Item successfully added!")
    setTimeout(() => setCurrentPage("view"), 1200)
  }

  
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 animate-pulse">Loading …</div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between h-16 px-4">
          <h1 className="self-center font-bold text-xl">Items Manager</h1>
          <div className="flex space-x-6">
            <button
              onClick={() => setCurrentPage("view")}
              className={`${
                currentPage === "view"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              View Items
            </button>
            <button
              onClick={() => setCurrentPage("add")}
              className={`${
                currentPage === "add" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Add Items
            </button>
          </div>
        </div>
      </nav>

      <Toast {...toast} onClose={hideToast} />

      <main className="max-w-7xl mx-auto py-6 px-4">
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
