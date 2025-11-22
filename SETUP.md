# E-Wardrobe Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **Python** 3.8 or higher ([Download](https://www.python.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

## Step-by-Step Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd E-Wardrobe

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Setup Python Cartoonization Service

```bash
# Navigate to the Cartoon Service directory
cd server/Cartoon_Service

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Return to root directory
cd ../..
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

Add the following configuration to `server/.env`:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/e-wardrobe
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/e-wardrobe

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Cloudinary Configuration (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Port
PORT=5001
```

#### Getting Cloudinary Credentials:
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### 4. Start MongoDB

If using local MongoDB:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should start automatically as a service
```

If using MongoDB Atlas, ensure your connection string is correct in `.env`

### 5. Start All Services

#### Option A: Using the Startup Script (Recommended)

```bash
# Make the script executable (first time only)
chmod +x start-services.sh

# Run the script
./start-services.sh
```

#### Option B: Manual Start (3 separate terminals)

**Terminal 1 - Python Cartoon Service:**
```bash
cd server/Cartoon_Service
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
python Cartoonize.py
```

**Terminal 2 - Node.js Backend:**
```bash
cd server
npm start
# Or for development with auto-reload:
# npm run dev
```

**Terminal 3 - Vite Frontend:**
```bash
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001
- **Cartoon Service:** http://localhost:6000

## Testing the Setup

1. **Test Backend Health:**
```bash
curl http://localhost:5001/api/health
```

2. **Test Cartoon Service:**
```bash
curl http://localhost:6000/cartoonize
```

3. **Create Test Account:**
- Go to http://localhost:5173
- Click "Get Started" or "Sign up"
- Fill in the registration form
- Login and start using the app

## Demo Account

For quick testing, use the demo account:
- **Username:** PID18
- **Password:** pass123

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` (should connect)
- Check your MONGO_URI in `.env`
- For Atlas, ensure your IP is whitelisted

### Python Service Not Starting
- Verify Python version: `python3 --version`
- Ensure virtual environment is activated
- Check if port 6000 is available: `lsof -i :6000` (macOS/Linux)

### Backend Not Starting
- Check if port 5001 is available
- Verify all environment variables are set
- Check MongoDB connection

### Frontend Not Loading
- Clear browser cache
- Check console for errors
- Ensure backend is running

### Cartoonization Not Working
- Verify Python service is running on port 6000
- Check browser console for errors
- Ensure image file is valid (PNG, JPG)

## Development Tips

### Hot Reload
- Frontend: Vite provides hot reload automatically
- Backend: Use `npm run dev` in server directory (requires nodemon)
- Python: Restart service after code changes

### Database Management
```bash
# Connect to MongoDB
mongosh

# Use the database
use e-wardrobe

# View collections
show collections

# View users
db.users.find()

# View items
db.items.find()
```

### Clearing Data
```bash
# Clear localStorage (in browser console)
localStorage.clear()

# Drop database (in mongosh)
use e-wardrobe
db.dropDatabase()
```

## Production Deployment

### Environment Variables
Update `.env` for production:
- Use strong JWT_SECRET
- Use MongoDB Atlas for database
- Configure proper CORS settings
- Use environment-specific URLs

### Build Frontend
```bash
npm run build
```

### Deploy Options
- **Frontend:** Vercel, Netlify, or any static hosting
- **Backend:** Heroku, Railway, DigitalOcean, AWS
- **Python Service:** Docker container on cloud platform

## Need Help?

- Check the main README.md for feature documentation
- Review API endpoints in the code
- Check browser console for frontend errors
- Check terminal logs for backend errors

---

Happy coding! 🚀
