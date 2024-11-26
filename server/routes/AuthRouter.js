import express from 'express'
import { signupValidation, loginValidation } from '../middlewares/AuthValidator.js'

import { signup, login, checkUser } from '../controllers/AuthController.js';

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUser);

export default router;