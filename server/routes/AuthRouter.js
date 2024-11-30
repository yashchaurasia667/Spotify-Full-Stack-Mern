import express from 'express'
import { signupValidation, loginValidation } from '../middlewares/AuthValidator.js'

import { signup, login, checkUser, ensureAuth, logout, getUser } from '../controllers/AuthController.js';

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUser);
router.post('/getuser', getUser);
router.get("/checkauth", ensureAuth);
router.get('/logout', logout)

export default router;