import bcrypt from "bcryptjs";
import querystring from "querystring";
import { URLSearchParams } from "url";

const stateKey = "spotifyAuthState";
const redirect_uri = "http://localhost:4000/spotify/callback";

export const checkTokenValidity = async (req, res) => {
  const { access_token } = req.cookies;
  // const access_token = req.query.access_token;
  if (!access_token) return res.status(400).json("Access Token is required");
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    });

    if (response.ok) {
      return res.status(200).json("Valid");
    } else {
      return res.status(401).json("Invalid Token");
    }
  } catch (error) {
    res.status(500).json("Internal server error: " + error);
  }
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
  const scope = [
    "user-read-private",
    "user-read-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-follow-read",
    "user-library-read",
    "user-read-email",
  ].join(" ");

  res.cookie(stateKey, state);

  try {
    res.redirect("https://accounts.spotify.com/authorize?" + querystring.stringify({
      response_type: "code",
      client_id: process.env.API_ID,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
      // show_dialog: true
    }));
  } catch (error) {
    res.status(500).json(`Internal server error: ${error}`)
  }
}

export const callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies[stateKey];

  if (!state || state != storedState)
    return res.redirect("/#" + querystring.stringify({ error: "state mismatch" }));
  if (!code)
    return res.redirect("/#" + querystring.stringify({ error: "authorization code missing" }));

  res.clearCookie(stateKey);

  const authOptions = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + (Buffer.from(process.env.API_ID + ":" + process.env.API_SECRET).toString("base64"))
    },
    // body: `code=${code}&redirect_uri=${redirect_uri}&grant_type=authorization_code`,
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }).toString(),
  };

  try {

    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const expiresIn = data.expires_in

      res.redirect("http://localhost:3000/#" + querystring.stringify({
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn
      }));
    } else {
      const errorData = await response.json();
      res.redirect("/#" + querystring.stringify({
        // error: "invalid token"
        error: errorData.error || "Unknown error"
      }))
    }
  } catch (error) {
    res.redirect("/#", querystring.stringify({ error: "token_exchange_failed" }));
  }
}

export const refreshToken = async (req, res) => {
  const refresh_token = req.query.refresh_token;
  if (!refresh_token) return res.status(400).json("Refresh token is required");

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
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", authOptions);

    if (response.ok) {
      const data = await response.json();
      const { access_token, expires_in } = data;
      return res.json({ access_token, expires_in })
    }
    else {
      const error = await response.text();
      res.status(response.status).json(`Failed to refresh token: ${error}`)
    }
  }
  catch (error) {
    res.status(500).json(`Internal server error: ${error}`);
  }
}

export const playlists = async (req, res) => {
  const access_token = req.query.access_token;

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      "Authorization": `Bearer ${access_token}`
    },
  });
  const data = await response.json();
  console.log(data)
  res.json(data)
}

export const search = async (req, res) => {
  const { query, type, limit } = req.body;
  const { access_token } = req.cookies;

  if (!access_token)
    return res.status(401).json("Unauthorized");

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`
      },
    });

    const data = await response.json();
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json("something went wrong")
  }
}

