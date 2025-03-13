import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv/config.js";

import db from "./db.js"

import Authrouter from "./routes/AuthRouter.js"
import Spotifyrouter from "./routes/SpotifyRouter.js"
import UserRouter from "./routes/UserRouter.js"
import PlaylistRouter from "./routes/PlaylistRouter.js"
import YoutubeRouter from "./routes/YoutubeRouter.js"


const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use('/uploads', express.static('./uploads'))

app.use('/auth', Authrouter)
app.use('/spotify', Spotifyrouter)
app.use('/user', UserRouter)
app.use('/playlist', PlaylistRouter)
app.use('/youtube', YoutubeRouter)

app.get('/ping', (req, res) => {
  res.json('pong')
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));