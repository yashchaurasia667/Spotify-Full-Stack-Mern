import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

try {
  mongoose.connect(MONGO_URI);
  console.log("MongoDB connected...");
} catch (error) {
  console.log(`MongoDB connection error ${error}`);
}
