import express from "express";
import dotenv from "dotenv/config.js";
import cors from 'cors'

import "./models/db.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
