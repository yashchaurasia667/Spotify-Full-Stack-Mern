import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import fs from 'fs'

import User from "../models/User.js"
import Playlist from "../models/Playlist.js";

mongoose.connect("mongodb://localhost:27017/Spotify")

const salt = bcrypt.genSaltSync(10);

export const signup = async (req, res) => {
  console.log('signup endpoint hit')
  const { email, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({
      email, password: bcrypt.hashSync(password, salt), name, year, month, day, profile: "profile_default.png",
      playlists: [], likedSongs: [], recents: [], access_token: "", refresh_token: ""
    })
    res.status(201).json(userDoc);
  }
  catch (error) {
    res.status(409).json(error)
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
  res.cookie("token", "").json("logged out")
}
