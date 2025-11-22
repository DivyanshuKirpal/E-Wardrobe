import express from 'express';
import { 
  getItems, 
  getItem, 
  addItem, 
  updateItem, 
  deleteItem,
  toggleFavorite 
} from '../controllers/wardrobeController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protect, getItems)
  .post(protect, upload.single('image'), addItem);

router.route('/:id')
  .get(protect, getItem)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

router.put('/:id/favorite', protect, toggleFavorite);

export default router;
