// server/routes/cartoon_proxy.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const router = express.Router();
const upload = multer({ dest: 'tmp/uploads/' });

const CARTOON_SERVICE_URL = process.env.CARTOON_SERVICE_URL || 'http://127.0.0.1:6000/cartoonize';

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ msg: 'No image uploaded' });

  const filePath = file.path;

  try {
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath), {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(CARTOON_SERVICE_URL, form, {
      headers: {
        ...form.getHeaders()
      },
      responseType: 'stream',
      timeout: 120000
    });

    // Forward content-type and stream the image back to client
    res.setHeader('Content-Type', 'image/png');
    response.data.pipe(res);
  } catch (err) {
    console.error('[cartoon_proxy] error:', err.message || err);
    // if the python service returned json/text error, try to surface it
    if (err.response && err.response.data) {
      try {
        const txt = await streamToString(err.response.data);
        console.error('service response:', txt);
      } catch(e){}
    }
    res.status(500).json({ error: err.message || String(err) });
  } finally {
    // cleanup temporary upload
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch(e){}
  }
});

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

module.exports = router;