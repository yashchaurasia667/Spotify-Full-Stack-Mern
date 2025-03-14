import Hero from "../components/login/hero.js";
import Footer from "../components/global/Footer.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  document.title = "Log In - Spotify";

  const favicon = document.querySelector("#favicon") as HTMLLinkElement | null;
  if (favicon) {
    favicon.href = "/spotifyBlack.svg";
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie) {
      document.cookie.split(";").length ? navigate("/") : "";
      // fetch("/api/user/getuser", {
      //   credentials: "include",
      // }).then((res) => {
      //   res.json().then((user) => {
      //     if (user.email) navigate("/");
      //   });
      // });
    }
  }, []);

  return (
    <>
      <div className="relative w-[100%] background bg-gradient-to-b from-[#2a2a2a] to-[#000000] flex flex-col items-center">
        <Hero />
        <Footer className={"sm:mt-6"} />
      </div>
    </>
  );
};

export default Login;
