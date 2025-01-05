import express from 'express'

import { signupValidation, loginValidation, isLoggedIn } from '../middlewares/AuthValidator.js'

import { signup, login, logout } from '../controllers/AuthController.js';

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/logout", isLoggedIn, logout);

export default router;