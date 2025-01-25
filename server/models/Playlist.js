import mongoose from "mongoose";

import { trackSchema } from "./Track.js"

const playlistTrackSchema = new mongoose.Schema({
  song: {
    type: trackSchema,
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
    type: Number,
    required: true,
  },
  songs: {
    type: [playlistTrackSchema],
    required: false,
  }
});

export default mongoose.model("Playlist", playlistSchema);