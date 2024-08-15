const GreenButton = ({ content = "", className = "", onClick = (e) => {} }) => {
  return (
    <div className={"w-[100%] flex justify-center"}>
      <button
        onClick={(e) => onClick(e)}
        className={
          `bg-[#1ed760] text-[#121212] text-base font-semibold rounded-full p-3 hover:font-black hover:bg-[#1fdf64] ` +
          className
        }
      >
        {content}
      </button>
    </div>
  );
};

export default GreenButton;
