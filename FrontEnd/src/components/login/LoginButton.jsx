import React from "react";

const LoginButton = () => {
  const buttonClass =
    "bg-[#1ed760] text-[#121212] text-base font-semibold rounded-full w-[65%] p-3 mt-[40px] mx-auto hover:font-black hover:w-[67%] hover:bg-[#1fdf64]";
  return (
    <div className="w-[100%] flex justify-center">
      <button className={buttonClass}>Log In</button>
    </div>
  );
};

export default LoginButton;
