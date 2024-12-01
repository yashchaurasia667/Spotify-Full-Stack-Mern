import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  const favicon = document.querySelector("#favicon") as HTMLLinkElement | null;
  if (favicon) favicon.href = "/spotifyBlack.svg";

  const navigate = useNavigate();
  useEffect(() => navigate("/signup/1"), []);
  return <></>;
};

export default SignUp;
