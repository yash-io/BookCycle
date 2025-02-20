import express from 'express';
import { addMaterial,getMaterials } from '../middleware/product.controller.js';

const router = express.Router();

router.post('/post-material', addMaterial);
router.get('/get-materials',getMaterials);

export default router;