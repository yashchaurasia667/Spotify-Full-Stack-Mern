import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";

const YTAPI = process.env.YOUTUBE_API
const activeStreams = {};

export const search = async (req, res) => {
  const { name, artist } = req.query;

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

    if (activeStreams[video_id]) {
      activeStreams[video_id].audioStream.destroy();
      activeStreams[video_id].ffmProc.kill();
    }

    const audioStream = ytdl(ytUrl, {
      filter: "audioonly",
      quality: stream_quality || "highestaudio",
      highWaterMark: 1 << 25,
      liveBuffer: 10000,
      dlChunkSize: 0
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");

    const ffmProc = ffmpeg(audioStream)
      .audioCodec("libmp3lame")
      .format("mp3")
      .on("error", (err) => {
        console.error(`FFmpeg error: ${err.message}`);
        if (!res.headersSent) res.status(500).json("Streaming Error");
        audioStream.destroy();
        ffmProc.kill();
        delete activeStreams[video_id];
      })
      .on("end", () => {
        console.log("ffmpeg processing finished successfully");
        delete activeStreams[video_id];
      });
    ffmProc.pipe(res, { end: true });
    console.log("Streaming");

    activeStreams[video_id] = { audioStream, ffmProc };

    res.on("close", () => {
      console.error("Client disconnected, stopping stream");
      audioStream.destroy();
      ffmProc.kill();
      delete activeStreams[video_id];
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
    const q = `${name} ${artist} official audio`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

    const ytres = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      }
    });
    const html = await ytres.text();

    const jsonMatch = html.match(/var ytInitialData = (\{.*?\});/);
    if (!jsonMatch) return res.status(500).json("Failed to extract video data");

    const jsonData = JSON.parse(jsonMatch[1]);

    const videos = jsonData.contents?.twoColumnSearchResultsRenderer?.primaryContents
      ?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents;

    if (!videos) return res.status(404).json("No results found");

    const video = videos.find((v) => v.videoRenderer);
    if (!video) return res.status(404).json("No valid video found");

    const videoId = video.videoRenderer.videoId;
    const durationString = video.videoRenderer.lengthText.simpleText || "0:00";

    res.status(200).json({ id: videoId, durationText: durationString });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}