import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { forgotPassword, getUserProfile, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/update', protectRoute, updateUser);
router.post('/forgotPassword', protectRoute, forgotPassword);
router.get('/profile/:username', protectRoute, getUserProfile);

export default router;