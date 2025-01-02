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
  const state = generateRandomString(16);
}