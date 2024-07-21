import { useState } from "react";

const InputLogin = ({ label, type = "text" }) => {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col items-start mb-4">
      <label className="text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        placeholder={label}
        className="bg-[#121212] border border-[#727272] rounded-[3px] hover:border-[#fff] focus-within:outline-none focus-within:border-white focus-within:border-[3px] py-3 px-3 w-[100%] h-[50px] box-border placeholder:text-[#a7a7a7]"
      />
    </div>
  );
};

export default InputLogin;
