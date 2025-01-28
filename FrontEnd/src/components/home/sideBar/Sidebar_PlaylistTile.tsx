import { useNavigate } from "react-router-dom";

interface props {
  cover: string;
  length: number;
  type: string;
  name: string;
  id: string;
  sidebarWidth: number;
}

const Sidebar_PlaylistTile = ({
  name,
  cover,
  length,
  type,
  id,
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
        src={`/api/uploads/playlists/${
          cover === "playlist_default.png"
            ? "playlist_default_small.png"
            : cover
        }`}
        className="rounded-md"
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

export default Sidebar_PlaylistTile;
