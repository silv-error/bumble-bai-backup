import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import { forgotPassword, getUserProfile, updateAddress, updateUser, getAllUsers, getMyAddress } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/address', protectRoute, getMyAddress);
router.post('/update', protectRoute, updateUser);
router.post('/updateAddress', protectRoute, updateAddress);
router.post('/forgotPassword', forgotPassword);
router.get('/', protectRoute, getAllUsers);

export default router;