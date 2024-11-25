import express from 'express'
import dotenv from "dotenv/config.js"

import User from './models/User.js';

import Authrouter from "./routes/AuthRouter.js"


const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/auth', Authrouter)

app.get('/ping', (req, res) => {
  res.json('pong')
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))