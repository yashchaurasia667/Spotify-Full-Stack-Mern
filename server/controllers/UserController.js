import fs from "fs";
import mongoose from "mongoose";

import User from "../models/User.js";

mongoose.connect("mongodb://localhost:27017/Spotify")

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

export const editProfile = async (req, res) => {
  const { name, id } = req.body;
  if (req.file) {
    const { originalname, path, filename } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newName = filename + "." + ext;
    const newPath = "uploads/" + newName;
    fs.renameSync(path, newPath);
    try {
      const userDoc = await User.findByIdAndUpdate(id, { name, profile: newName })
      if (userDoc)
        res.status(200).json(filename)
      else throw new Error("something went wrong")
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  else {
    try {
      const userDoc = await User.findByIdAndUpdate(id, { name })
      if (userDoc)
        res.status(200).json(true)
      else throw new Error("something went wrong")
    }
    catch (error) {
      res.status(500).json("Internal server error")
    }
  }
}

export const linkSpotify = async (req, res) => {
  const { id, access_token, refresh_token } = req.body;
  console.log(req.body)
  try {
    const userDoc = await User.findByIdAndUpdate(id, { access_token, refresh_token })
    console.log(userDoc)
    if (userDoc)
      res.status(200).json(true)
    else throw new Error("something went wrong")
  } catch (error) {
    res.status(500).json("Internal server error")
  }
}