import { useContext } from "react";

import PurpleBar from "./PurpleBar";

import SignupContext from "../../../context/signupContext/SignupContext";

const BottomPlayBar = () => {
  const { loggedIn } = useContext(SignupContext);
  return <>{!loggedIn ? <PurpleBar /> : <div></div>}</>;
};

export default BottomPlayBar;
