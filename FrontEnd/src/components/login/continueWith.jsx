const ContinueWith = ({ platformName, logoPath }) => {
  const buttonContent =
    logoPath === "" ? "" : <img src={logoPath} alt={platformName} className="h-[25px]"/>;
  return (
    <>
      <button className="border border-[#727272] rounded-[30px] flex items-center pl-7 py-2.5 mb-2 w-[100%] hover:border-[#fff]">
        {buttonContent} <p className="pl-7 text-base font-medium">Continue with {platformName}</p>
      </button>
    </>
  );
};

export default ContinueWith;
