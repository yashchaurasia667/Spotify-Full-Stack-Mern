const GreenButton = ({ content = "", className = ""}) => {
  return (
    <div className={"w-[100%] flex justify-center"}>
      <button
        className={
          `bg-[#1ed760] text-[#121212] text-base font-semibold rounded-full p-3 hover:font-black w-[95%] hover:bg-[#1fdf64] ` +
          className
        }
      >
        {content}
      </button>
    </div>
  );
};

export default GreenButton;
