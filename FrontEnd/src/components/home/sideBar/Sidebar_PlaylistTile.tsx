interface props {
  cover: string;
  length: number;
  type: string;
  name: string;
  id: string;
}

const Sidebar_PlaylistTile = ({ name, cover, length, type, id }: props) => {
  return (
    <div>
      <img src={cover} alt="" />
      <div>
        <p>{name}</p>
        <div>
          <p>{type}</p>
          <p>{length} songs</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar_PlaylistTile;
