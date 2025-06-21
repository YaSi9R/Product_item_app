# Item Management Website

A modern, responsive web application for managing inventory items with image support and local storage persistence.

## 🚀 Features

### Core Functionality
- **Two Main Pages**: View Items and Add Items
- **Item Management**: Add new items with detailed information
- **Image Support**: Upload cover images and multiple additional images
- **Modal Details**: Click any item to view full details in a modal
- **Image Carousel**: Navigate through multiple item images
- **Enquiry System**: Send enquiries for items with toast notifications

### Technical Features
- **Local Storage**: All data persists between browser sessions
- **Base64 Image Storage**: Images are converted and stored locally
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful fallbacks for failed operations

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **JavaScript (ES6+)** - Programming language
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - For placeholder image generation
- **Local Storage API** - Data persistence
- **File Reader API** - Image processing

## 📋 Requirements Fulfilled

### ✅ Add Items Page
- Form with all required fields:
  - Item Name (required)
  - Item Type (dropdown: Shirt, Pant, Shoes, Sports Gear, Accessories, Other)
  - Item Description (required)
  - Item Cover Image (file upload)
  - Item Additional Images (multiple file uploads)
- Success message: "Item successfully added"
- Automatic redirect to View Items page after adding

### ✅ View Items Page
- Displays all items with name and cover image
- Starts with 3 static demo items with professional images
- Shows newly added items immediately
- Responsive grid layout
- Click any item to open detailed modal

### ✅ Item Details Modal
- Shows all item information
- Image carousel with navigation arrows
- Thumbnail indicators
- Image counter (e.g., "2 of 5")
- "Enquire" button with success notification
- Modal closes automatically after enquiry

### 🎯 Bonus Features Implemented
- **Image Upload from PC**: Real file upload with preview
- **Toast Notifications**: Professional notification system
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Better user experience
- **Error Handling**: Graceful error management
- **Data Persistence**: Items survive page refresh

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Download or clone the project files
2. Open terminal in the VS code and run npm start in your web browser
3. Start adding and viewing items!

### Usage
1. **View Items**: See all your items in a grid layout
2. **Add Items**: Click "Add Items" to create new entries
3. **Upload Images**: Click to browse and select images from your computer
4. **View Details**: Click any item card to see full details
5. **Make Enquiries**: Click "Enquire" button in item details

## 📁 Project Structure

```
├── app.jsx                 # Main application component
├── components/
│   ├── ViewItems.jsx       # Items grid display
│   ├── AddItems.jsx        # Add item form
│   ├── ItemModal.jsx       # Item details modal
│   └── Toast.jsx           # Notification component
├── app/
│   ├── globals.css         # Global styles
│   └── page.tsx            # Next.js page wrapper
└── README.md               # This file
```

## 🎨 Design Features

- **Clean Interface**: Modern, professional design
- **Intuitive Navigation**: Easy switching between pages
- **Visual Feedback**: Hover effects and transitions
- **Image Previews**: See uploaded images immediately
- **Responsive Grid**: Adapts to different screen sizes
- **Professional Typography**: Clean, readable fonts

## 💾 Data Storage

- **Local Storage**: All data stored in browser's localStorage
- **Base64 Images**: Images converted to base64 for storage
- **Persistent Data**: Items survive browser refresh/restart
- **Quota Management**: Handles storage limits gracefully

## 🔧 Technical Implementation

### Image Handling
- File upload with drag-and-drop styling
- Base64 conversion for local storage
- Image preview before submission
- Multiple image support per item
- Remove/replace image functionality

### State Management
- React hooks for state management
- Local storage synchronization
- Loading states for better UX
- Error boundary handling

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🐛 Known Limitations

- **Storage Limit**: Browser localStorage has ~5MB limit
- **Image Size**: Large images may hit storage limits
- **Browser Dependency**: Data tied to specific browser
- **No Cloud Sync**: Data doesn't sync across devices

## 🚀 Future Enhancements

- **Database Integration**: Connect to real database
- **Email Functionality**: Send actual emails for enquiries
- **User Authentication**: Multi-user support
- **Cloud Storage**: Store images in cloud
- **Search & Filter**: Find items quickly
- **Export/Import**: Backup and restore data
- **Image Compression**: Reduce storage usage
- **Drag & Drop**: Drag and drop image uploads

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

This is an assignment project. For improvements or suggestions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a coding assignment.

## 👨‍💻 Author

Created as part of a web development assignment demonstrating:
- React.js proficiency
- Modern JavaScript features
- Responsive web design
- Local storage management
- File handling and image processing
- User experience design

---

**Assignment Completed**: ✅ All requirements fulfilled with bonus features
**Technologies**: React.js, JavaScript, Tailwind CSS
**Features**: Item management, image upload, responsive design, local storage
