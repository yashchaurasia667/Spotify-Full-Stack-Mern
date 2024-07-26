import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use('/api/auth', authRoutes);

try {
  mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB`);
} catch (error) {
  console.error(`Error connecting to MongoDB... ${error}`);
}

app.post("/login", (req, res) => {
  console.log("req received");
  res.status(200).json({ message: "req received" });
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
