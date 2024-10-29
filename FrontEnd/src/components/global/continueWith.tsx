interface props {
  platformName: string;
  logoPath: string;
  className?: string;
}

const ContinueWith = ({ platformName, logoPath, className = "" }: props) => {
  const buttonContent =
    logoPath === "" ? (
      ""
    ) : (
      <img src={logoPath} alt={platformName} className="h-[25px] left-0" />
    );
  return (
    <>
      <button
        className={
          "border border-essential-subdued rounded-[30px] flex items-center pl-7 py-2.5 mb-2 w-[90%] hover:border-white mx-auto " +
          className
        }
      >
        {buttonContent}{" "}
        <div className="pl-7 text-base font-medium">
          Continue with {platformName}
        </div>
      </button>
    </>
  );
};

export default ContinueWith;
