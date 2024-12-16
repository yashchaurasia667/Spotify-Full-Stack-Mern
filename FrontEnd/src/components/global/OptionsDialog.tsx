import React, { useRef, useEffect, useState } from "react";

interface dialogProps {
  dialogClass?: string;
  dialogContent: React.JSX.Element;
  dialogOpen: boolean;
}

const OptionsDialog = ({
  dialogClass,
  dialogContent,
  dialogOpen,
}: dialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(dialogOpen);

  const clickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      console.log("edge");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (dialogOpen) document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [dialogOpen]);

  return (
    <dialog ref={dialogRef} open={open} className={dialogClass}>
      {dialogContent}
    </dialog>
  );
};

export default OptionsDialog;
