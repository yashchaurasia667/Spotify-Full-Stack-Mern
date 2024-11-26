import express from 'express'
import dotenv from "dotenv/config.js"
import cors from "cors"

import Authrouter from "./routes/AuthRouter.js"


const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())
app.use('/auth', Authrouter)

app.get('/ping', (req, res) => {
  res.json('pong')
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))