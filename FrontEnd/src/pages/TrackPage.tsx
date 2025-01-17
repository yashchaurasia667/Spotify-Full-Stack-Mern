import { useParams } from "react-router-dom";

interface props {
  cover: string;
  type: string;
  name: string;
  artist: string[];
  album: string;
  year: number;
  duration: number;
}

const TrackPage = ({
  cover,
  type,
  name,
  artist,
  album,
  year,
  duration,
}: props) => {
  return (
    <div className="bg-background-base rounded-lg">
      <div>
        <img src={cover} alt={name} />
        <div>
          <p>{type}</p>
          <h1>{name}</h1>
          <div>
            <img src={cover} />
            <p>{album}</p>
            <p>{year}</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
