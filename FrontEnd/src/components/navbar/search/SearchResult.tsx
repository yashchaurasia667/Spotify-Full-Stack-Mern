interface props {
  name: string;
  artists: string[];
  cover: string;
  duration: number;
}

const SearchResult = ({ name, artists, cover, duration }: props) => {
  return (
    <div>
      <img src={cover} alt={name} />
      <p>{name}</p>
      <p>{artists}</p>
      <p>{duration}</p>
    </div>
  );
};

export default SearchResult;
