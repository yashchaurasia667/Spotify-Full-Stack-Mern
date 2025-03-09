import { useNavigate } from "react-router-dom";

interface props {
  cover: string;
  length: number;
  type: string;
  name: string;
  id: string;
  sidebarWidth: number;
  owner?: string;
}

const Library_PlaylistTile = ({
  name,
  cover,
  length,
  type,
  id,
  owner,
  sidebarWidth,
}: props) => {
  const navigate = useNavigate();

  return (
    <div
      // className="flex gap-x-3 h-[65px] rounded-lg hover;bg-[#acacac18] cursor-pointer overflow-hidden"
      className="flex gap-x-3 h-[65px] rounded-lg p-2 hover:bg-[#acacac18] cursor-pointer overflow-hidden"
      onClick={() => navigate(`/playlist/${id}`)}
    >
      <img
        // src={`/api/uploads/${
        //   cover === "playlist_default.png"
        //     ? "global/playlist_default_small.png"
        //     : `${owner}/${id}/${cover}`
        // }`}
        src={cover}
        // height={65}
        width={50}
        className="rounded-md object-cover"
      />
      {sidebarWidth > 70 ? (
        <div>
          <p>{name}</p>
          <div className="flex">
            <p className="text-text-subdued">{type}</p>
            <p className="text-text-subdued mx-1">•</p>
            <p className="text-text-subdued">{length} songs</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Library_PlaylistTile;
