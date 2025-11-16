const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: "outfits route working placeholder" });
});

module.exports = router;