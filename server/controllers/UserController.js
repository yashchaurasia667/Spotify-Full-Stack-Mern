import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import User from "../models/User.js";

mongoose.connect("mongodb://localhost:27017/Spotify")

export const checkUser = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json("Bad Request: email is required to find the user")
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc)
      res.status(404).json("user not found")
    else
      res.status(200).json("user found")
  } catch (error) {
    console.log(error)
    res.status(500).json(`Something went wrong ${error}`);
  }
}

export const getCurrentUser = async (req, res) => {
  const { user_id } = req.cookies;
  if (!user_id) return res.status(400).json("Bad Request: id is required to get user info")

  try {
    const user = await User.findById(user_id).select("-password -year -day -month");

    if (!user) return res.status(404).json("User not found")
    res.json(user)
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`)
  }
}

export const getUser = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json("Bad request: user id is required to get user info");

  try {
    const user = await User.findById(user_id).select("-password -year -day -month");

    if (!user) return res.status(404).json("User not found")
    res.json(user)
  } catch (error) {
    res.status(500).json(`Something went wrong ${error}`)
  }
}

export const editProfile = async (req, res) => {
  const { user_id } = req.cookies;
  const { name } = req.body;

  if (!user_id) return res.status(401).json("Unauthorized")

  if (req.file) {
    const { originalname, filename } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newName = "profile." + ext;

    const newDir = `uploads/${user_id}/`;
    fs.mkdirSync(newDir, { recursive: true });

    const newPath = path.join(newDir, newName);
    fs.renameSync(`uploads/tmp/${filename}`, newPath);

    try {
      const userDoc = await User.findByIdAndUpdate(user_id, { name, profile: newName })
      if (userDoc)
        res.status(200).json(filename)
      else throw new Error("something went wrong")
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  }
  else {
    try {
      const userDoc = await User.findByIdAndUpdate(user_id, { name })
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
  const { id } = req.body;
  const { access_token, refresh_token } = req.cookies;
  try {
    const userDoc = await User.findByIdAndUpdate(id, { access_token: access_token, refresh_token: refresh_token })
    // console.log(userDoc)
    if (userDoc)
      res.status(200).json(true)
    else throw new Error("something went wrong")
  } catch (error) {
    res.status(500).json("Internal server error")
  }
}

export const getUserPlaylists = async (req, res) => {
  const { user_id } = req.cookies;
  if (!user_id) return res.status(400).json("user id is requried");

  try {
    const userDoc = await User.findById(user_id);
    res.status(200).json(userDoc.playlists)
  } catch (error) {
    res.status(500).json("Failed to fetch playlists")
  }
}

export const getLikedSongs = async (req, res) => {
  const { user_id } = req.cookies;

  try {
    const userDoc = await User.findById(user_id);
    if (!userDoc)
      return res.status(404).json("User not found");
    res.status(200).json(userDoc.likedSongs);
  } catch (error) {
    res.status(500).json("Internal server error: " + error);
  }
}

export const addToLikedSongs = async (req, res) => {
  const { user_id } = req.cookies;

  try {
    const userDoc = await User.findByIdAndUpdate();
  } catch (error) {
    res.status(500).json("Internal server error: " + error);
  }
}