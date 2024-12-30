import mongoose from "mongoose";

import { userSchema } from "./User";
import { songSchema } from "./Song"

const playlistSongSchema = new mongoose.Schema({
  song: {
    type: songSchema,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  }
});

const playlistSchema = new mongoose.Schema({
  cover: {
    type: String,
    requried: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: number,
    required: true,
  },
  songs: {
    type: [playlistSongSchema],
    required: true,
  }
});

export default mongoose.model("Playlist", playlistSchema);