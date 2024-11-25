import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"

export const signup = async (req, res) => {
  const { username, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({ ...req.body })
    res.json(userDoc);
  }
  catch (error) {
    res.status(400).json(error)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
  } catch (error) {
    res.status(400).json(error);
  }
}