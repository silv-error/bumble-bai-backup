import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import { createProduct, getAllProducts, getMyProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', protectRoute, getAllProducts);
router.get('/shop', protectRoute, getMyProducts);
router.post('/create', protectRoute, createProduct);

export default router;