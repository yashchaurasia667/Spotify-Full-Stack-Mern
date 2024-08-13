import express from "express";
import { signupValidation } from "../middlewares/AuthValidation.js";
import { signup } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.status(200).send("Login success");
});

router.post("/signup", signupValidation, signup);

export default router;
