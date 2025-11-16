// server/routes/items.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// If Cloudinary keys are absent, throw a helpful error when uploading
const hasCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

let upload;
if (hasCloudinary) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'ewardrobe',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 1200, crop: 'limit' }]
    }
  });
  upload = multer({ storage });
} else {
  // Fallback: in-memory storage (not persisted). You can implement disk storage alternative later.
  upload = multer({ storage: multer.memoryStorage() });
}

// POST /api/items
// headers: Authorization: Bearer <token>
// body: multipart/form-data with "image" file, optional "title" and "tags" fields
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    // If using Cloudinary storage with multer-storage-cloudinary, req.file.path contains the URL and req.file.filename/public_id may exist depending on lib version.
    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      // multer-storage-cloudinary sets `path` to the remote url
      imageUrl = req.file.path || (req.file.secure_url || null);
      // Some versions set `filename` or `public_id`
      publicId = req.file.filename || req.file.public_id || null;
    }

    if (!imageUrl) {
      return res.status(400).json({ msg: 'Image upload required. Check CLOUDINARY keys if using Cloudinary.' });
    }

    const { title = '', tags = '' } = req.body;
    const tagsArr = typeof tags === 'string' && tags.length ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];

    const item = new Item({
      owner: req.user.id,
      title,
      imageUrl,
      publicId,
      tags: tagsArr
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.error('POST /api/items error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/items  - list all items for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('GET /api/items error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;