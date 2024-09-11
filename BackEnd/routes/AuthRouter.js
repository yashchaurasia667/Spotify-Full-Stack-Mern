import express from "express";
import { signupValidation, loginValidation, checkUserValidation } from "../middlewares/AuthValidation.js";
import { signup, login, checkUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post('/checkuser', checkUserValidation, checkUser)

export default router;
