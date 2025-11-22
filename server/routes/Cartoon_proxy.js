// server/routes/cartoon_proxy.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Proxy route to Python Flask cartoonization service
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No image file provided' });
    }

    // Forward to Python Flask service running on port 6000
    const form = new FormData();
    form.append('image', req.file.buffer, {
      filename: req.file.originalname || 'image.png',
      contentType: req.file.mimetype
    });

    const response = await axios.post('http://localhost:6000/cartoonize', form, {
      headers: form.getHeaders(),
      responseType: 'arraybuffer',
      timeout: 30000 // 30 second timeout
    });

    // Return the cartoonized image
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Cartoonization error:', error.message);
    res.status(500).json({ 
      msg: 'Cartoonization failed', 
      error: error.message,
      hint: 'Make sure Python Flask service is running on port 6000'
    });
  }
});

module.exports = router;
