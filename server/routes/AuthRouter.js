import express from 'express'
import { signupValidation, loginValidation } from '../middlewares/AuthValidator.js'

import { signup, login, checkUser, ensureAuth, logout } from '../controllers/AuthController.js';

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUser);
router.get("/checkauth", ensureAuth);
router.get('/logout', logout)

export default router;