import express from 'express'
import dotenv from "dotenv/config.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

import Authrouter from "./routes/AuthRouter.js"


const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use('/auth', Authrouter)

app.get('/ping', (req, res) => {
  res.json('pong')
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))