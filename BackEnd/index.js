import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(cors());

try {
  mongoose.connect(MONGO_URI);
} catch (error) {
  console.error(`Something went wrong... ${error}`);
}

app.post("/login", (req, res) => {
  console.log("req received");
  res.status(200).json({ message: "req received" });
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
