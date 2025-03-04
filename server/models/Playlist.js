import mongoose from "mongoose";

const playlistTrackSchema = new mongoose.Schema({
  song: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
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
  description: {
    type: String,
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
  },
  public: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model("Playlist", playlistSchema);