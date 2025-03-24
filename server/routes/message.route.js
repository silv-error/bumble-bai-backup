import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";

import { getConversations, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);
router.get('/', protectRoute, getConversations);


export default router;