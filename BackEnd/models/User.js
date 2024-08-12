import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
  },
  day: {
    type: Number,
    required: true,
    min: [1, "Year must be atleast 1900"],
    max: [
      31,
      "Please enter the day of your birth date by entering a number between 1 and 31.",
    ],
  },
});

const userModel = mongoose.model("Users", UserSchema);
export default userModel;
