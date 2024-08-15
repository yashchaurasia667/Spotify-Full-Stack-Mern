import express from "express";
import dotenv from "dotenv/config.js";
import cors from 'cors'

import AuthRouter from './routes/AuthRouter.js'
import "./models/db.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.use('/auth', AuthRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
