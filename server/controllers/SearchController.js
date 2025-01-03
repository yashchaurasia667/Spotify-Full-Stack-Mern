import bcrypt from "bcryptjs";
import querystring from "querystring";

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

  res.redirect("https://accounts.spotify.com/authorize?" + querystring.stringify({
    response_type: "code",
    client_id: process.env.API_ID,
    scope: scope,
    redirect_uri: "http://localhost:4000/search/callback",
    state: state
  }));
}

export const callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state) {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://localhost:4000/search/callback",
        grant_type: "authorization_code"
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + (Buffer.from(process.env.API_ID + ":" + process.env.API_SECRET).toString("base64"))
      },
      json: true
    };
  }
  else
    res.redirect("/#" + querystring.stringify({ error: "state mismatch" }));
}