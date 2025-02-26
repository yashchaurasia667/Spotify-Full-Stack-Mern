import { RGB, trackDetails } from "../../types";

interface props {
  background: RGB;
  duration_ms: number | undefined;
  trackDetails: trackDetails | undefined;
}

const TrackHeader = ({ background, duration_ms, trackDetails }: props) => {
  // const [duration, setDuration] = useState({ hours: 0, mins: 0, seconds: 0 });
  const convertToTime = (durationMs: number) => {
    const hours = Math.floor(durationMs / 600000);
    durationMs %= 600000;
    const mins = Math.floor(durationMs / 60000);
    durationMs %= 60000;
    const seconds = Math.floor(durationMs / 1000);
    // setDuration({ hours, mins, seconds });
    return { hours: hours, mins: mins, seconds: seconds };
  };

  // const [duration, setDuration] = useState(convertToTime(duration_ms));
  const duration = convertToTime(duration_ms || 0);

  return (
    <div
      className="bg-background-base flex items-center gap-x-6 min-h-[50vh] pt-24 pb-6 px-6"
      style={{
        background: `linear-gradient(to bottom, rgba(${background.r}, ${background.g}, ${background.b}, 0.9), rgba(${background.r}, ${background.g}, ${background.b}, 0.5))`,
      }}
    >
      <img
        src={trackDetails?.album.images[1].url}
        className="rounded-md shadow-[0px_0px_20px_#00000088] h-full"
      />
      <div className="font-medium -tracking-wide">
        <p>
          {trackDetails?.type
            ? trackDetails?.type.charAt(0).toUpperCase() +
              trackDetails?.type.slice(1)
            : "Error"}
        </p>
        <h1 className="text-8xl font-extrabold -tracking-wider">
          {trackDetails?.name}
        </h1>
        <div className="flex gap-x-1">
          <p>{trackDetails?.artists[0].name}</p>
          <span
            className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
            data-encore-id="text"
            data-separator="true"
          >
            •
          </span>
          <p>{trackDetails?.album.name}</p>
          <span
            className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
            data-encore-id="text"
            data-separator="true"
          >
            •
          </span>
          <p className="text-text-subdued">
            {trackDetails?.album.release_date}
          </p>
          <span
            className="encore-text encore-text-body-small encore-internal-color-text-subdued ArQQy9kpoXLmafHpoi6u FGrkEs4xa3OtWqaSmtvc text-text-subdued"
            data-encore-id="text"
            data-separator="true"
          >
            •
          </span>
          <p className="text-text-subdued">{`${
            duration.hours ? duration.hours + ":" : ""
          }${duration.mins}:${duration.seconds}`}</p>
        </div>
      </div>
    </div>
  );
};

export default TrackHeader;
