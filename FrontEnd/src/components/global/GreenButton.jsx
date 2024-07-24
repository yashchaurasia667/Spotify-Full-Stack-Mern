const GreenButton = ({ content }) => {
  const buttonclass = `bg-[#1ed760] text-[#121212] text-base font-semibold rounded-full p-3 mt-[40px] mx-auto hover:font-black w-[95%] sm:w-[65%] hover:bg-[#1fdf64]`;
  return (
    <div className="w-[100%] flex justify-center">
      <button className={buttonclass}>{content}</button>
    </div>
  );
};

export default GreenButton;
