import Hero from "../components/login/hero.js";
import Footer from "../components/global/Footer.js";

const Login = () => {
  document.title = "Log In - Spotify";

  const favicon = document.querySelector("#favicon") as HTMLLinkElement | null;
  if (favicon) {
    favicon.href = "/spotifyBlack.svg";
  }
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
