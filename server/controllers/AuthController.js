import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import fs from 'fs'

import User from "../models/User.js"
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Spotify")

const salt = bcrypt.genSaltSync(10);

export const signup = async (req, res) => {
  const { email, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({ email, password: bcrypt.hashSync(password, salt), name, year, month, day, profile: "profile_default.png" })
    res.json(userDoc);
  }
  catch (error) {
    res.status(409).json(error)
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk)
      return res.status(403).json("Incorrect Username or password")

    jwt.sign(
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
      res.status(200).json(false)
    else
      res.status(200).json(true)
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`);
  }
}

export const ensureAuth = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (error, info) => {
      if (error) throw error;
      res.json(info)
    })
  }
  else res.json(false)
}

export const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne(email).select("-password -year -day -month");

    if (!user) return res.status(404).json("User not found")
    res.json(user)
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`)
  }
}

export const logout = async (req, res) => {
  res.cookie("token", "").json("logged out")
}

export const editProfile = async (req, res) => {
  const { name, id } = req.body;
  if (req.file) {
    const { originalname, path, fieldname } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const fileName = fieldname + "." + ext;
    const newPath = "uploads/" + fileName;
    fs.renameSync(path, newPath);
    try {
      const userDoc = await User.findByIdAndUpdate(id, { name, profile: fileName })
      res.status(200).json(fieldname)
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  // const userdoc = User.findByIdAndUpdate(id, { name, profile },)
  else res.status(200).json('ok')
}