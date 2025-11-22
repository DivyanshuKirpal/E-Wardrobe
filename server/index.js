require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const outfitsRoutes = require('./routes/outfits');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test health route
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/outfits', outfitsRoutes);

// Cartoon proxy route
const cartoonProxy = require('./routes/cartoon_proxy');
app.use('/api/cartoonize', cartoonProxy);

const PORT = process.env.PORT || 5001;

// MongoDB & server start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB Error:", err));