import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: [1900, "Year must be atleast 1900"],
    max: [
      new Date().getFullYear(),
      "You are too young to create a Spotify account.",
    ],
  },
  month: {
    type: Number,
    required: true,
    min: [1, "Select a month"],
    max: [12]
  },
  day: {
    type: Number,
    required: true,
    min: [1, "Please select a day"],
    max: [
      31,
      "Please enter the day of your birth date by entering a number between 1 and 31.",
    ],
  },
  profile: {
    type: String,
    required: true,
  }
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;