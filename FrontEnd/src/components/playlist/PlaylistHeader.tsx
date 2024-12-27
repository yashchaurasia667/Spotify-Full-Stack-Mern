import { RGB } from "types";

interface props {
  bg: RGB;
  cover: string;
  name: string;
  type: string;
  author?: string;
  length: number;
  time?: string;
}

const PlaylistHeader = ({
  bg,
  cover,
  name,
  type,
  author,
  length,
  time,
}: props) => {
  return (
    // <div className="relative bg-[#4b3692] h-fit bg-gradient-to-t from-[#00000066] to-[#00000000]">
    <div
      className="relative h-fit bg-gradient-to-t from-[#00000066] to-[#00000000]"
      style={{ backgroundColor: `rgb(${bg.r}, ${bg.g}, ${bg.b})` }}
    >
      <div className="flex gap-x-5 items-center px-4 py-5 h-full">
        <img
          src={cover}
          width={250}
          height={250}
          className="rounded-md shadow-[0px_0px_20px_#00000088]"
        />
        <div className="flex flex-col gap-y-3">
          <p className="font-medium">{type}</p>
          <h2 className="text-8xl font-extrabold -tracking-[0.2rem]">{name}</h2>
          <div className="flex gap-x-3 items-center">
            <div
              className="flex"
              style={{
                width: 25,
                height: 25,
              }}
            >
              <img
                src="http://localhost:4000/uploads/profile.png"
                className="rounded-[50%] object-cover"
              />
            </div>
            {author ? <p>{author}</p> : ""}
            <p className="text-text-subdued -tracking-wider font-medium">
              {time || length + " Songs"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
