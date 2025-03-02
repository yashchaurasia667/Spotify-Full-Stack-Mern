import fs from "fs";

import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import path from "path";

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
      const { originalname, filename } = req.file;

      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newName = filename + "." + ext;

      const newDir = `uploads/${user_id}/${playlist_id}`;
      fs.mkdirSync(newDir, { recursive: true });

      const newPath = path.join(newDir, newName);
      fs.renameSync(`uploads/tmp/${filename}`, newPath);

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
    const userDoc = await User.findById(user_id);
    userDoc.playlists = userDoc.playlists.filter((id) => id != playlist_id)
    await userDoc.save();

    res.status(204).json("Deleted")
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
}

export const getPlaylistDetails = async (req, res) => {
  const { playlist_id } = req.query;
  if (!playlist_id) return res.status(400).json("Bad request");

  try {
    const playlistDoc = await Playlist.findById(playlist_id);
    if (playlistDoc)
      return res.status(200).json(playlistDoc);
    res.status(404).json("not found");
  } catch (error) {
    res.status(500).json("Internal server error: " + error)
  }
}

export const addToPlaylist = async (req, res) => {
  const { user_id } = req.cookies;
  const { playlist_id, track_id } = req.query;

  if (!user_id || !playlist_id || !track_id) return res.status(400).json("Bad Request: user id, playlist id, track id are required")

  try {
    const playlistDoc = await Playlist.findById(playlist_id);
    if (!playlistDoc) return res.status(404).json("Playlist not found");
    const owner_id = playlistDoc.owner.toString()
    if (owner_id != user_id) return res.status(401).json("Unauthorized");

    playlistDoc.songs.push({ song: track_id });
    await playlistDoc.save();
    res.status(200).json("track added");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
}

export const getTracks = async (req, res) => {
  const { playlist_id } = req.query;

  if (!playlist_id) return res.status(400).json("Bad Request: Playlist id is required");

  try {
    const playlistDoc = await Playlist.findById(playlist_id);
    if (!playlistDoc) return res.status(404).json("Playlist not found");

    const tracks = playlistDoc.songs;
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal server Error")
  }
}

export const removeTrack = async (req, res) => {
  const { user_id } = req.cookies;
  const { playlist_id, track_index } = req.query;
  if (!user_id || !playlist_id || !track_index) return res.status(400).json("Bad request: user id, playlist id, track id are required");

  try {
    const playlistDoc = await Playlist.findById(playlist_id);
    if (!playlistDoc) return res.status(404).json("Playlist not found");

    const owner_id = playlistDoc.owner.toString()
    if (owner_id != user_id) return res.status(401).json("Unauthorized");

    if (track_index > -1)
      playlistDoc.songs.splice(track_index - 1, 1);
    await playlistDoc.save();
    res.status(200).json("track removed");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}