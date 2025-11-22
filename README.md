# E-Wardrobe 👔✨

Your Digital Wardrobe, Simplified - Organize, explore, and style your clothes effortlessly with AI-powered outfit recommendations and smart wardrobe management.

## 🚀 Features

- **Smart Wardrobe Management** - Upload and organize your clothing items by category
- **AI Cartoonization** - Transform your clothing images into fun bit emoji style using OpenCV
- **Virtual Try-On** - Drag and drop items to create and preview outfits
- **User Authentication** - Secure login/signup with JWT tokens
- **Personal Trash** - User-specific trash management with restore functionality
- **Favorites & Stats** - Track your favorite items and wardrobe statistics
- **Responsive Design** - Beautiful UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Cloudinary for image storage
- Multer for file uploads

### AI Service
- Python Flask
- OpenCV for image processing
- Custom cartoonization algorithm

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- Python 3.8+
- MongoDB
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd E-Wardrobe
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Setup Python environment**
```bash
cd server/Cartoon_Service
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd ../..
```

5. **Configure environment variables**

Create `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5001
```

6. **Start all services**

Option A - Use the startup script (recommended):
```bash
./start-services.sh
```

Option B - Start services manually:

Terminal 1 - Python Cartoon Service:
```bash
cd server/Cartoon_Service
source .venv/bin/activate
python Cartoonize.py
```

Terminal 2 - Node.js Backend:
```bash
cd server
npm start
```

Terminal 3 - Vite Frontend:
```bash
npm run dev
```

## 🎯 Usage

1. **Access the app** at `http://localhost:5173`
2. **Sign up** for a new account or **login** with existing credentials
3. **Upload items** to your wardrobe by clicking the + button in each category
4. **Choose style** - Original or Cartoon (bit emoji style)
5. **Drag items** to the avatar to try on outfits
6. **Save outfits** for later use
7. **Manage trash** - Items can be restored or permanently deleted

### Demo Credentials
- Username: `PID18`
- Password: `pass123`

## 🐛 Bug Fixes

This update includes fixes for:
- ✅ Login/Signup modals now display properly with correct z-index
- ✅ Sidebar opens from left side instead of under profile
- ✅ Trash is now user-specific (no cross-user visibility)
- ✅ Replaced HuggingFace API with local OpenCV backend
- ✅ Enhanced cartoonization with bit emoji style
- ✅ Improved modal visibility and interactions

## 🎨 New Features

- **Enhanced Cartoonization** - Better bit emoji style with color quantization
- **Image Preview** - Hover over items to see details
- **Improved Sidebar** - Clean left-side navigation with icons
- **Better Modals** - Higher z-index ensures proper display
- **User-Specific Data** - Trash and items are isolated per user

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account

### Items
- `GET /api/items` - Get user's wardrobe items
- `POST /api/items` - Upload new item
- `DELETE /api/items/:id` - Delete item

### Cartoonization
- `POST /api/cartoonize` - Transform image to cartoon style

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🙏 Acknowledgments

- OpenCV for image processing
- Cloudinary for image hosting
- MongoDB for database
- React team for the amazing framework

---

Made with ❤️ by Your Team
