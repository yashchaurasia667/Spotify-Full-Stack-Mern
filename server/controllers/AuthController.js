import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
// import fs from 'fs'

import User from "../models/User.js"
// import Playlist from "../models/Playlist.js";

mongoose.connect("mongodb://localhost:27017/Spotify")

const salt = bcrypt.genSaltSync(10);

export const signup = async (req, res) => {
  const { email, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({
      email, password: bcrypt.hashSync(password, salt), name, year, month, day, profile: "profile_default.png",
      playlists: [], likedSongs: [], recents: [], access_token: "", refresh_token: ""
    });
    if (!userDoc) {
      throw new Error("Failed to create user");
    }
    res.status(201).json(userDoc);
  }
  catch (error) {
    res.status(409).json(error)
  }
}

export const changePassword = async (req, res) => {
  const { current_password, new_password } = req.body;
  const { user_id } = req.cookies;

  if (!user_id || !new_password) return res.status(400).json("Bad request: user id and new password are required");

  const schema = Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[\d\W]).{10,}$/);
  const { error } = schema.validate(new_password);

  if (error) return res.status(403).json("Please use the proper format for the password");

  try {
    const userDoc = await User.findById(user_id);
    if (!userDoc) return res.status(404).json("User not found");
    if (userDoc.password !== bcrypt.hashSync(current_password, salt)) return res.status(401).json("Unauthorized");

    userDoc.password = bcrypt.hashSync(new_password, salt);
    await userDoc.save();

    res.status(201).json("Password set");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

export const authenticate = async (req, res) => {
  const { user_id } = req.cookies;
  const { password } = req.query;

  if (!user_id || !password) return res.status(400).json("Bad Request: user id and password are required");

  try {
    const userDoc = await User.findById(user_id);
    if (!userDoc) return res.status(404).json("User not found");

    if (userDoc.password == bcrypt.hashSync(password, salt))
      return res.status(200).json("Authorized");
    else
      return res.status(401).json("Unauthorized");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json("Bad Request");

  try {
    const userDoc = await User.findOne({ email });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk)
      return res.status(403).json("Incorrect Username or password")

    jwt.sign(
      { email: userDoc.email, id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "100y" }, (error, token) => {
        if (error) throw error;
        res.cookie("token", token)
        res.cookie("user_id", userDoc._id)
        res.json({ id: userDoc._id, email })
      });
  } catch (error) {
    res.status(500).json(`Internal Server Error ${error}`);
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

export const logout = async (req, res) => {
  // res.cookie("token", "").json("logged out")
  res.clearCookie("token").clearCookie("access_token").clearCookie("refresh_token").clearCookie("user_id").json("logged out");
}
