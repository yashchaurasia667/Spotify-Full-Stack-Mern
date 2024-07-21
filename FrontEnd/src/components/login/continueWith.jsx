const ContinueWith = ({ platformName, logoPath }) => {
  return (
    <>
      <button className="">
        <img src={logoPath} alt={platformName} /> Continue with {platformName}
      </button>
    </>
  );
};

export default ContinueWith;
