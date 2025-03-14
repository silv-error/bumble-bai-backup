import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/update', protectRoute, updateUser);
router.get('/profile/:username', protectRoute, getUserProfile);

export default router;