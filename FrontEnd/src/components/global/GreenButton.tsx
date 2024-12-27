import React, { ReactNode } from "react";

interface props {
  content: ReactNode;
  className?: string;
  onClick?: (e: React.FormEvent) => void;
}

const GreenButton = ({ content, className, onClick }: props) => {
  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={
        `bg-essential-positive text-background-base text-base font-semibold rounded-full p-3 hover:font-black ` +
        className
      }
    >
      {content}
    </button>
  );
};

export default GreenButton;
