import express from 'express'
import multer from 'multer'

import { signupValidation, loginValidation, isLoggedIn } from '../middlewares/AuthValidator.js'

import { signup, login, checkUser, logout, getUser, editProfile } from '../controllers/AuthController.js';

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUser);
router.post('/getuser', isLoggedIn, getUser);
router.get('/logout', isLoggedIn, logout);
router.get('/editprofile', isLoggedIn, multer({ dest: "uploads/" }).single("file"), editProfile);

export default router;