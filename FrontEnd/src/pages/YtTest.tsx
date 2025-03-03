import YouTube, { YouTubeProps } from "react-youtube";

const YtTest = () => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
  };
  return (
    <div>
      {/* <YouTube
        videoId={"pFptt7Cargc"}
        opts={{ playerVars: { autoplay: 1, controls: 0 } }}
        onReady={onPlayerReady}
      /> */}
      <audio controls autoPlay>
        <source
          src={`/api/youtube/stream?video_id=${"pFptt7Cargc"}&stream_quality=${"highestaudio"}`}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default YtTest;
