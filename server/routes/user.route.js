import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import { forgotPassword, getUserProfile, updateAddress, updateUser, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/profile/:username', protectRoute, getUserProfile);
router.post('/update', protectRoute, updateUser);
router.post('/updateAddress', protectRoute, updateAddress);
router.post('/forgotPassword', forgotPassword);
router.get('/', protectRoute, getAllUsers);

export default router;