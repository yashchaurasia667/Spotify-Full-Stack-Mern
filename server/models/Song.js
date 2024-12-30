import mongoose from "mongoose";

export const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  artists: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    required: true,
  },
  albums: {
    type: [String],
  },
  duration: {
    type: Number,
    required: true,
  },
  release: {
    type: Date,
    required: true
  }
});

const songModel = mongoose.model("Song", songSchema);
export default songModel;