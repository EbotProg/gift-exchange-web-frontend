import React from "react";
import SingleColor from "./singleColor";

interface UserResponseProps {
  color: string;
}

const UserResponse = ({ color }: UserResponseProps) => {
  return (
    <div>
      Your response:
      {color === "" ? <div>No response</div> : <SingleColor color={color} />}
    </div>
  );
};

export default UserResponse;
