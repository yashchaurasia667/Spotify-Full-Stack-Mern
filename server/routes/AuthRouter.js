import express from 'express'
import { signupValidation, loginValidation } from '../middlewares/AuthValidator.js'

import { signup } from '../controllers/AuthController.js';

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;