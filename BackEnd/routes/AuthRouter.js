import express from "express";
import { signupValidation, loginValidation } from "../middlewares/AuthValidation.js";
import { signup, login } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

export default router;
