import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ErrorBanner = ({
  logo = <HiOutlineExclamationCircle className="scale-150" />,
  content = "",
  color = "#e91429",
  textColor = "#121212",
}) => {
  const styles = {
    color: textColor,
    backgroundColor: color,
    fontWeight: "500",
    display: "grid",
    gridTemplateColumns: "auto auto",
    columnGap: "15px",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    padding: "15px 30px",
  };
  return (
    <div style={styles}>
      {logo}
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default ErrorBanner;
