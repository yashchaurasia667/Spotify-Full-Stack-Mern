const YTAPI = process.env.YOUTUBE_API
export const search = async (req, res) => {
  try {
    // const ytres = await fetch(`https://www.googleapis.com/youtube/v3/search?part=${"id"}&q=${"yellow"}`,
    //   {
    //     method: "get"
    //   }
    // );
    const ytres = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=${"id"}&channelType=${"any"}&eventType=${"none"}&q=${"yellow"}&key=${YTAPI}`)
    if (!ytres.ok) {
      console.log(ytres)
      throw new Error("Failed to fetch from youtube");
    }
    const data = await ytres.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error")
  }
}