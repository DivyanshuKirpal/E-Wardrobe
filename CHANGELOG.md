# Changelog

All notable changes to the E-Wardrobe project.

## [2.0.0] - 2025-11-20

### 🐛 Bug Fixes

#### Login/Signup Modals
- **Fixed:** Login and Signup modals now display properly
- **Changed:** Increased z-index from `z-50` to `z-[200]` to ensure modals appear above all content
- **Changed:** Improved backdrop opacity for better visibility

#### Sidebar Navigation
- **Fixed:** Sidebar no longer opens under profile dropdown
- **Changed:** Sidebar now opens from the left side as a full-height panel
- **Added:** Beautiful icons for each navigation item
- **Added:** User profile section at the top of sidebar
- **Improved:** Better visual hierarchy and spacing

#### Trash Management
- **Fixed:** Trash is now user-specific - each user has their own trash
- **Changed:** Trash localStorage key now includes user ID: `trashedItems_${userId}`
- **Fixed:** Trash items no longer visible across different users
- **Added:** User dependency to reload trash when user changes

### 🎨 New Features

#### OpenCV Cartoonization
- **Removed:** HuggingFace API dependency
- **Added:** Local Python Flask service for image cartoonization
- **Added:** Enhanced bit emoji style with color quantization
- **Added:** Saturation boost for vibrant cartoon look
- **Added:** Edge detection with adaptive threshold
- **Added:** Bilateral filtering for smooth results
- **Performance:** Faster processing with local service

#### UI Enhancements
- **Added:** StatsWidget component showing:
  - Total items count
  - Saved outfits count
  - Favorites count
  - Items in trash
  - Category breakdown with progress bars
- **Added:** Toast notification system for user feedback
- **Added:** Search functionality in wardrobe
- **Added:** Image preview on hover with metadata
- **Added:** Smooth animations and transitions
- **Improved:** Modal styling and user experience

#### Developer Experience
- **Added:** `start-services.sh` - One-command startup script
- **Added:** `git-update.sh` - Automated git workflow
- **Added:** `SETUP.md` - Comprehensive setup guide
- **Added:** `requirements.txt` for Python dependencies
- **Updated:** README.md with full documentation

### 🔧 Technical Improvements

#### Backend
- **Added:** `/api/cartoonize` endpoint - Proxy to Python service
- **Added:** `cartoon_proxy.js` route handler
- **Fixed:** Server port configuration (5001)
- **Improved:** Error handling and timeout management

#### Frontend
- **Added:** `cartoonAPI.js` service replacing HuggingFace
- **Added:** `StatsWidget.jsx` component
- **Added:** `Toast.jsx` notification component
- **Improved:** Search filtering logic
- **Improved:** Modal z-index management
- **Added:** CSS animations for toast notifications

#### Python Service
- **Enhanced:** Cartoonization algorithm
- **Added:** Image resizing for performance
- **Added:** Color quantization for bit emoji effect
- **Added:** Saturation enhancement
- **Improved:** Edge detection quality

### 📝 Documentation
- **Added:** Comprehensive README.md
- **Added:** SETUP.md with step-by-step instructions
- **Added:** CHANGELOG.md (this file)
- **Added:** Inline code comments
- **Improved:** API documentation

### 🚀 Performance
- **Optimized:** Image processing with local service
- **Reduced:** External API dependencies
- **Improved:** Load times with better state management
- **Added:** Image resizing before processing

### 🔐 Security
- **Improved:** User data isolation
- **Fixed:** Cross-user data leakage in trash
- **Maintained:** JWT authentication
- **Maintained:** Secure password hashing

## [1.0.0] - Previous Version

### Initial Features
- User authentication (login/signup)
- Wardrobe management (upload, organize, delete)
- Category-based organization (upper, lower, bottom)
- Virtual try-on with drag and drop
- Outfit saving functionality
- Favorites system
- Basic statistics
- HuggingFace AI integration
- Cloudinary image storage
- MongoDB database
- React + Vite frontend
- Express backend

---

## Migration Guide

### From v1.0.0 to v2.0.0

1. **Install Python dependencies:**
   ```bash
   cd server/Cartoon_Service
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Update environment variables:**
   - No changes required to `.env` file

3. **Clear old trash data (optional):**
   ```javascript
   // In browser console
   localStorage.removeItem('trashedItems');
   ```

4. **Start Python service:**
   ```bash
   cd server/Cartoon_Service
   source .venv/bin/activate
   python Cartoonize.py
   ```

5. **Or use the startup script:**
   ```bash
   ./start-services.sh
   ```

### Breaking Changes
- Trash data structure changed (now user-specific)
- HuggingFace API removed (replaced with local OpenCV)
- Python service required for cartoonization

### Deprecations
- `HuggingFaceAPI.js` - Use `cartoonAPI.js` instead
- Global trash storage - Now user-specific

---

## Roadmap

### Upcoming Features
- [ ] Outfit recommendations based on weather
- [ ] Color palette analysis
- [ ] Wardrobe analytics dashboard
- [ ] Social sharing of outfits
- [ ] Mobile app version
- [ ] AI-powered style suggestions
- [ ] Clothing care reminders
- [ ] Shopping list integration
- [ ] Outfit calendar/planner
- [ ] Export wardrobe data

### Known Issues
- None currently reported

---

For questions or issues, please open a GitHub issue.
