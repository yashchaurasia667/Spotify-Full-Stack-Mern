import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

try {
  mongoose.connect(MONGO_URI);
} catch (error) {
  console.error(`Something went wrong... ${error}`);
}

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
