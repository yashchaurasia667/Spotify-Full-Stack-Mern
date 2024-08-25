const GreenButton = ({ content = "", className = "", onClick = (e) => {} }) => {
  return (
    <div className={"w-[100%] flex justify-center"}>
      <button
        onClick={(e) => onClick(e)}
        className={
          `bg-essential-positive text-background-base text-base font-semibold rounded-full p-3 hover:font-black ` +
          className
        }
      >
        {content}
      </button>
    </div>
  );
};

export default GreenButton;
