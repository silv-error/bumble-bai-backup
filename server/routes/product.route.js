import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import { createProduct, deleteProduct, getAllProducts, getMyProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', protectRoute, getAllProducts);
router.get('/shop', protectRoute, getMyProducts);
router.post('/create', protectRoute, createProduct);
router.post('/delete/:id', protectRoute, deleteProduct);

export default router;