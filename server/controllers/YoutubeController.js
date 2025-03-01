const YTAPI = process.env.YOUTUBE_API
export const search = async (req, res) => {
  const { name, artist } = req.query;
  // const { q } = req.query;
  try {
    const ytres = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=${"id"}&q=${name + " " + artist}&key=${YTAPI}&maxResults=${1}`);
    if (!ytres.ok) {
      console.error(ytres)
      throw new Error("Failed to fetch from youtube");
    }
    const data = await ytres.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error")
  }
}