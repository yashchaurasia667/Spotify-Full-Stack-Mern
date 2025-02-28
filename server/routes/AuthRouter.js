import express from 'express'

import { signupValidation, loginValidation, isLoggedIn } from '../middlewares/AuthValidator.js'

import { signup, login, logout, authenticate, changePassword } from '../controllers/AuthController.js';

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/logout", isLoggedIn, logout);
router.get("/authenticate", isLoggedIn, authenticate);
router.post("/changePassword", isLoggedIn, changePassword);

export default router;