const ContinueWith = ({ platformName, logoPath }) => {
  const buttonContent =
    logoPath === "" ? "" : <img src={logoPath} alt={platformName} className="h-[25px] left-0"/>;
  return (
    <>
      <button className="border border-[#727272] rounded-[30px] flex items-center pl-7 py-2.5 mb-2 w-[90%] md:w-[63%] hover:border-[#fff] mx-auto">
        {buttonContent} <div className="pl-7 text-base font-medium">Continue with {platformName}</div>
      </button>
    </>
  );
};

export default ContinueWith;
