import fs from "fs";
import mongoose from "mongoose";

import Playlist from "../models/Playlist.js";
import User from "../models/User.js";

export const createPlaylist = async (req, res) => {
  const { user_id } = req.cookies;
  if (!user_id) return res.status(403).json("Need User id to create a playlist");

  try {
    const userDoc = await User.findById(user_id);
    if (!userDoc) return res.status(400).json("Could not find a user with that id");

    const playlistDoc = await Playlist.create({
      cover: "playlist_default.png",
      name: `My playlist #${userDoc.playlists.length + 1}`,
      owner: user_id,
      duration: 0,
      songs: [],
      public: true
    });

    userDoc.playlists.push(playlistDoc._id);
    await userDoc.save();

    res.status(201).json(playlistDoc._id);
  }
  catch (error) {
    res.status(500).json("Failed to create playlist");
  }
}

export const editPlaylist = async (req, res) => {
  const { name, description } = req.body;

  const { user_id } = req.cookies;
  const { playlist_id } = req.query;
  if (!user_id || !playlist_id) return res.status(400).json("Bad request: user id and playlist id is required");

  try {
    const playlistDoc = await Playlist.findById(playlist_id);
    if (playlistDoc.owner != user_id)
      return res.status(401).json("You can not edit this playlist");

    if (name)
      playlistDoc.name = name;
    if (description)
      playlistDoc.description = description;

    if (req.file) {
      // console.log(req.file)
      const { originalname, path, filename } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newName = filename + "." + ext;
      const newPath = "uploads/playlists/" + newName;

      fs.renameSync(path, newPath);
      playlistDoc.cover = newName;
    }

    await playlistDoc.save();
    res.status(201).json("Changes saved");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export const deletePlaylist = async (req, res) => {
  const { user_id } = req.cookies;
  const { playlist_id } = req.query;
  if (!user_id || !playlist_id) return res.status(400).json("Bad request: user id and playlist id are requiured");

  try {
    const playlistDoc = await Playlist.findByIdAndDelete(playlist_id);
    if (!playlistDoc || playlistDoc.owner != user_id)
      return res.status(401).json("Unauthorized: You can not perform that action on this playlist")

    res.status(204).json("Deleted")
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
}