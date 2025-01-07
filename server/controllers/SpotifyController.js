import bcrypt from "bcryptjs";
import querystring from "querystring";

import User from "../models/User.js";

const stateKey = "spotifyAuthState";
const redirect_uri = "http://localhost:4000/spotify/callback";

export const getToken = async (req, res) => {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.API_ID,
    client_secret: process.env.API_SECRET
  });

  try {

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString()
    });
    const data = await response.json();
    if (response.ok)
      return res.status(200).json(data)
    throw new Error("Failed to get access token")
  }
  catch (error) {
    res.status(500).json(`Internal server error: ${error}`);
  }
}

export const login = async (req, res) => {
  const state = bcrypt.genSaltSync(16);
  const scope = "user-read-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative user-follow-read user-library-read user-read-email";

  res.cookie(stateKey, state);
  res.redirect("https://accounts.spotify.com/authorize?" + querystring.stringify({
    response_type: "code",
    client_id: process.env.API_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
}

export const callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state && state == storedState) {
    res.clearCookie(stateKey);

    const authOptions = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + (Buffer.from(process.env.API_ID + ":" + process.env.API_SECRET).toString("base64"))
      },
      body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
      json: true,
    };
    // 
    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);

    if (response.status == 200) {
      response.json().then((data) => {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;

        res.redirect("http://localhost:3000/#" + querystring.stringify({
          access_token: accessToken,
          refresh_token: refreshToken
        }))
      })
    }
    else
      res.redirect("/#" + querystring.stringify({
        error: "invalid token"
      }))
  }
  else
    res.redirect("/#" + querystring.stringify({ error: "state mismatch" }));
}

export const refreshToken = async (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    // url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + (Buffer.from(process.env.API_ID + ":" + process.env.API_SECRET).toString("base64"))
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true,
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
  if (response.status == 200) {
    const access_token = body.access_token;
    const refresh_token = body.refresh_token || refresh_token;
    res.json({ access_token, refresh_token })
  }
}

export const search = async (req, res) => {
  const { userId, query, type, limit } = req.body;
  const userDoc = User.findById(userId)
  console.log(userDoc);

  // const response = await fetch("https://api.spotify.com/v1/search", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Basic ${}`
  //   },
  // })
}