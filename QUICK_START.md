# E-Wardrobe Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites Check
```bash
node --version    # Should be v18+
python3 --version # Should be 3.8+
mongosh          # Should connect to MongoDB
```

### Installation (One-Time Setup)

```bash
# 1. Install all dependencies
npm install
cd server && npm install && cd ..

# 2. Setup Python
cd server/Cartoon_Service
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd ../..

# 3. Configure environment
cat > server/.env << EOF
MONGO_URI=mongodb://localhost:27017/e-wardrobe
JWT_SECRET=your_secret_key_change_this
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5001
EOF
```

### Start Application

**Option 1 - Automatic (Recommended):**
```bash
./start-services.sh
```

**Option 2 - Manual (3 terminals):**
```bash
# Terminal 1
cd server/Cartoon_Service && source .venv/bin/activate && python Cartoonize.py

# Terminal 2
cd server && npm start

# Terminal 3
npm run dev
```

### Access Application
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5001
- **Python Service:** http://localhost:6000

### Demo Login
- **Username:** PID18
- **Password:** pass123

---

## 🎯 Common Commands

```bash
# Test your setup
./test-setup.sh

# Start all services
./start-services.sh

# Update git repository
./git-update.sh

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install

# Setup Python environment
cd server/Cartoon_Service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

---

## 🐛 Troubleshooting

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Find and kill process on port 5001
lsof -ti:5001 | xargs kill -9

# Find and kill process on port 6000
lsof -ti:6000 | xargs kill -9
```

### Python Service Not Starting
```bash
# Activate virtual environment
cd server/Cartoon_Service
source .venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt

# Test manually
python Cartoonize.py
```

### Frontend Not Loading
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📝 Key Features

### For Users
- ✅ Upload clothing items
- ✅ Cartoonize images (bit emoji style)
- ✅ Virtual try-on with drag & drop
- ✅ Save and manage outfits
- ✅ Search wardrobe
- ✅ User-specific trash
- ✅ Statistics dashboard

### For Developers
- ✅ React 19 + Vite
- ✅ Tailwind CSS
- ✅ MongoDB + Mongoose
- ✅ JWT Authentication
- ✅ OpenCV Image Processing
- ✅ Cloudinary Storage

---

## 🔗 Useful Links

- **Full Setup Guide:** [SETUP.md](SETUP.md)
- **Bug Fixes Summary:** [FIXES_SUMMARY.md](FIXES_SUMMARY.md)
- **Changelog:** [CHANGELOG.md](CHANGELOG.md)
- **Main README:** [README.md](README.md)

---

## 💡 Tips

1. **First Time?** Run `./test-setup.sh` to verify everything is installed
2. **Quick Start?** Use `./start-services.sh` to start all services at once
3. **Need Help?** Check [SETUP.md](SETUP.md) for detailed instructions
4. **Found a Bug?** Check [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for known issues

---

## 📞 Support

If you encounter issues:
1. Run `./test-setup.sh` to diagnose problems
2. Check the troubleshooting section above
3. Review [SETUP.md](SETUP.md) for detailed help
4. Check browser console for frontend errors
5. Check terminal logs for backend errors

---

**Happy Coding! 🎉**
