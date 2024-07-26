import express from "express";
import User from "../models/User.js";

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    user = new User({ email, password });
    await user.save();

    res.status(201).json({ msg: "User registered Successfully" });
  } catch (error) {
    console.error(error.message || error);
    res.status(500).send("Server error");
  }
});

export default router;
