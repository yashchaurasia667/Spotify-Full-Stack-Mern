import { Link } from "react-router-dom";

import spotify from "/spotifyGreen.svg";

const NotFound = () => {
  document.title = "Page not found";

  const favicon = document.querySelector("#favicon") as HTMLLinkElement | null;
  if (favicon) favicon.href = "/spotifyGreen.svg";

  return (
    <div className="bg-background-base flex flex-col justify-center items-center h-screen">
      <img src={spotify} alt="spotify logo" className="w-[60px]" />
      <p className="text-5xl font-semibold mt-10">Page not found</p>
      <p className="text-text-subdued mt-5">
        We can't seem to find the page you are looking for.
      </p>
      <Link
        to={"/"}
        className="text-black bg-text-base rounded-full font-semibold px-8 py-3.5 mt-10 hover:scale-105"
      >
        Home
      </Link>
      <Link
        to={"https://support.spotify.com/in-en/"}
        className="mt-8 font-medium hover:underline"
      >
        Help
      </Link>
    </div>
  );
};

export default NotFound;
