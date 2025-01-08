import bcrypt from "bcryptjs";
import querystring from "querystring";
import { URLSearchParams } from "url";

const stateKey = "spotifyAuthState";
const redirect_uri = "http://localhost:4000/spotify/callback";

export const checkTokenValidity = async (req, res) => {
  const { token } = req.cookies;
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (response.ok)
    return res.status(200).json("Valid");
  return res.status(401).json("Invalid Token");
}

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
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + (Buffer.from(process.env.API_ID + ":" + process.env.API_SECRET).toString("base64")),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }).toString(),
    json: true,
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
  console.log(response)
  if (response.status == 200) {
    const data = await response.json();
    // const access_token = body.access_token;
    // const refresh_token = body.refresh_token || refresh_token;
    // res.json({ access_token, refresh_token })
    console.log(data);
  }
  res.json('well done');
}

export const search = async (req, res) => {
  // const { query, type, limit } = req.body;
  const { access_token } = req.cookies;

  if (!access_token)
    return res.status(401).json("Unauthorized");

  try {
    const response = await fetch("https://api.spotify.com/v1/search?q=save+your+tears&type=track", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`
      },
    });

    const data = await response.json();
    console.log(data)
    res.status(200).json("well done")
  } catch (error) {
    res.status(500).json("something went wrong")
  }
}

