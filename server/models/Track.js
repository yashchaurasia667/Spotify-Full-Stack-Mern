import mongoose from "mongoose";

export const trackSchema = new mongoose.Schema({
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

const trackModel = mongoose.model("Track", trackSchema);
export default trackModel;