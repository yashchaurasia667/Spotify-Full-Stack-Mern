import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  document.title = "Sign up - Spotify";
  document.querySelector("#favicon").href = "/spotifyBlack.svg";

  const navigate = useNavigate();
  useEffect(() => navigate("/signup/1"), []);
};

export default SignUp;
