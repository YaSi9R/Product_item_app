"use client"

import { useEffect } from "react"

const Toast = ({ message, type = "success", isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000) // Increased to 4 seconds for better visibility
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-4 rounded-lg shadow-xl z-[60] transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-full opacity-0 scale-95"
      }`}
      style={{ minWidth: "300px", maxWidth: "500px" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {type === "success" && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === "error" && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className="font-medium">{message}</span>
        </div>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 font-bold text-lg transition-colors">
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast
