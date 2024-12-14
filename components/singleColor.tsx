import React from "react";

interface SingleColorProps {
  color: string;
  disabled?: boolean;
  isFree?: boolean;
  handleClick?: () => void;
}

const SingleColor = ({
  color,
  disabled,
  handleClick,
  isFree,
}: SingleColorProps) => {
  return (
    <div>
      <button
        disabled={isFree === false ? true : false}
        className={`p-9 border rounded-full disabled:opacity-10 shadow-sm ${disabled === true ? "opacity-10" : ""}`}
        onClick={handleClick}
        style={{ backgroundColor: color }}
      ></button>
    </div>
  );
};

export default SingleColor;
