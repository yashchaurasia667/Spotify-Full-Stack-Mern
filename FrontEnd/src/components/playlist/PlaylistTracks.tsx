import Track from "../global/Track";

interface props {
  id: string;
}

const PlaylistTracks = ({ id }: props) => {
  return (
    <div>
      <Track
        rank={1}
        name="Lovers Rock"
        artist="TV Girl"
        cover="https://i.scdn.co/image/ab67616d00004851e1bc1af856b42dd7fdba9f84"
        album="French Exit"
        duration="3:00"
      />
    </div>
  );
};

export default PlaylistTracks;
