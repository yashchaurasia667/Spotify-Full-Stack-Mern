import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

import User from "../models/User.js"
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Spotify")

const salt = bcrypt.genSaltSync(10);

export const signup = async (req, res) => {
  const { email, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({ email, password: bcrypt.hashSync(password, salt), name, year, month, day })
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
    if (!passOk)
      return res.status(403).json("Incorrect Username or password")

    const token = jwt.sign(
      { email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET, {}, (error, token) => {
        if (error) throw error;
        res.cookie('token', token).json({ id: userDoc._id, email })
      });
  } catch (error) {
    res.status(500).json(`Internal Server Error ${error}`);
  }
}

export const checkUser = async (req, res) => {
  const { email } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc)
      res.status(200).json(false);
    else
      res.status(200).json(true);
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
}