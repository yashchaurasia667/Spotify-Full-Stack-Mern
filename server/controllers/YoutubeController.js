import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";

const YTAPI = process.env.YOUTUBE_API

export const search = async (req, res) => {
  const { name, artist } = req.query;
  // const { q } = req.query;
  try {
    const ytres = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=${"id"}&q=${name + " " + artist + "official audio"}&key=${YTAPI}&maxResults=${1}`);
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

export const stream = async (req, res) => {
  const { video_id, stream_quality } = req.query;
  if (!video_id) return res.status(400).json("Bad Request: youtube video id is required");

  const ytUrl = `https://youtube.com/watch?v=${video_id}`;

  try {
    if (!(ytdl.validateURL(ytUrl))) return res.status(400).json("Invalid video url");

    const audioStream = ytdl(ytUrl, {
      filter: "audioonly",
      quality: stream_quality || "highestaudio",
      highWaterMark: 1 << 25,
      liveBuffer: 10000,
      dlChunkSize: 0
    });
    const info = await ytdl.getInfo(ytUrl);
    console.log(`duration: ${info.videoDetails.lengthSeconds}`)

    // res.setHeader("duration", info.videoDetails.lengthSeconds);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");

    const ffmProc = ffmpeg(audioStream)
      .audioCodec("libmp3lame")
      .format("mp3")
      .on("error", (err) => {
        if (err.message.includes("ffmpeg was killed with signal SIGKILL")) {
          console.log("FFmpeg stopped due to client disconnection.");
        } else {
          console.error(`FFmpeg error: ${err.message}`);
          if (!res.headersSent) res.status(500).json("Streaming Error");
        }
      });
    ffmProc.pipe(res, { end: true });
    console.log("Streaming");

    res.on("close", () => {
      console.log("Client disconnected, stopping stream");
      audioStream.destroy();
      ffmProc.kill();
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

export const ytSearch = async (req, res) => {
  const { name, artist } = req.query;
  if (!name || !artist) return res.status(400).json("Bad request: name and artist are required");

  try {
    const url = `https://www.youtube.com/results?search_query=${name} ${artist} official audio`;
    const ytres = await fetch(url)
    const html = await ytres.text();

    const ids = html.match(/watch\?v=(\S{11})/);
    res.status(200).json(ids[1]);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}