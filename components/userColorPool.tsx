"use client";
import React from "react";
import SingleColor from "./singleColor";
import { ColorInfo } from "@/app/page";

interface UserColorPoolProps {
  colors: ColorInfo[];
  handleClick: (colorInfo: ColorInfo) => void;
}

const UserColorPool = ({ colors, handleClick }: UserColorPoolProps) => {
  return (
    <div className="border shadow-sm p-4 flex flex-wrap gap-7 rounded-lg">
      {colors.map((color) => (
        <SingleColor
          key={color.id}
          isFree={color.isFree}
          color={color.color}
          handleClick={() => handleClick(color)}
          disabled={color.disabled}
        />
      ))}
    </div>
  );
};

export default UserColorPool;
