// src/routes/auth.js
import express from "express";
const router = express.Router();
import {login, register, logout, refreshToGetAccessToken} from '../controllers/auth';
import {authenticateJWT} from '../middleware/auth';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout);
router.post('/refresh', refreshToGetAccessToken);

export default router;
