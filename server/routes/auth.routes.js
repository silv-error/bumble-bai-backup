import express from "express";
import { signup, login, logout, me } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.get('/me', me);

export default router;