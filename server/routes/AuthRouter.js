import express from 'express'
import multer from 'multer'

import { signupValidation, loginValidation } from '../middlewares/AuthValidator.js'

import { signup, login, checkUser, ensureAuth, logout, getUser, editProfile } from '../controllers/AuthController.js';

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUser);
router.post('/getuser', getUser);
router.get("/checkauth", ensureAuth);
router.get('/logout', logout);
router.get('/editprofile', editProfile);

export default router;