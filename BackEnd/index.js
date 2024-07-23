import express from "express";
import mongoose, { mongo } from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;

try {
    mongoose.connect('mongodb://localhost:27017')
} catch (error) {
  console.error(`Something went wrong... ${error}`);
}

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
