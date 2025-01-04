import express from 'express'
import dotenv from "dotenv/config.js"
import cookieParser from 'cookie-parser';
import cors from "cors"
import multer from 'multer';

import Authrouter from "./routes/AuthRouter.js"
import Spotifyrouter from "./routes/SpotifyRouter.js"


const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use('/uploads', express.static('./uploads'))
app.use('/auth', Authrouter)
app.use('/spotify', Spotifyrouter)

app.get('/ping', (req, res) => {
  res.json('pong')
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))