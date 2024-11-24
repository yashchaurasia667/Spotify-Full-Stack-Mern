import express from 'express'
import dotenv from "dotenv/config.js"

import User from './models/User.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json('pong')
});

app.post('/register', async (req, res) => {
  const { username, password, name, year, month, day } = req.body;

  try {
    const userDoc = await User.create({ ...req.body })
    res.json(userDoc);
  }
  catch (error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))