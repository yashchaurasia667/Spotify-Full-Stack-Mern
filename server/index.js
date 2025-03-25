import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";

import dotenv from "dotenv/config.js";
import https from "https";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import db from "./db.js"

import Authrouter from "./routes/AuthRouter.js"
import Spotifyrouter from "./routes/SpotifyRouter.js"
import UserRouter from "./routes/UserRouter.js"
import PlaylistRouter from "./routes/PlaylistRouter.js"
import YoutubeRouter from "./routes/YoutubeRouter.js"


const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

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


const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
}, app);
sslServer.listen(PORT, () => console.log(`SSL Server running on port ${PORT}`));
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));