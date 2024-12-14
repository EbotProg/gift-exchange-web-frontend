"use client";
import UserColorPool from "@/components/userColorPool";
import UserResponse from "@/components/userResponse";
import React, { useState } from "react";
import axios from "axios";

export type ColorInfo = {
  id: string;
  color: string;
  disabled: boolean;
  isFree: boolean;
};

const DashboardPage = () => {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [colorID, setColorID] = useState<string>("");
  const [color, setColor] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  function generateRandomColor(): string {
    const hexValues = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += hexValues[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const fetchColors = async (email: string) => {
    const data = await axios.get(
      `https://gift-exchange-web-backend.onrender.com/${email}`,
    );
    console.log("data", data);
    if (data.data.status === "error") {
      setMsg(data.data.message);
      setColors([]);
      setColorID("");
      setColor("");
      return;
    }
    setMsg("");
    const users: { color: string; _id: string; isFree: boolean }[] =
      data.data.users;
    console.log("users", users);
    const arr: {
      color: string;
      id: string;
      disabled: boolean;
      isFree: boolean;
    }[] = [];
    users.map((user) => {
      arr.push({
        id: user._id,
        color: generateRandomColor(),
        disabled: false,
        isFree: user.isFree,
      });
    });
    setColors(arr);
  };

  const handleSubmitColorResponse = async () => {
    const userValueResponse = await axios.get(
      `https://gift-exchange-web-backend.onrender.com/user/${email}`,
    );
    console.log("user", userValueResponse);
    const response = await axios.put(
      `https://gift-exchange-web-backend.onrender.com/${userValueResponse.data.user._id}/${colorID}`,
    );
    console.log("response", response);
    window.location.reload();
  };

  const handleColorChange = (colorInfo: ColorInfo) => {
    setColors((prevState) =>
      prevState.map((color) =>
        color.id === colorInfo.id
          ? { ...colorInfo, disabled: !colorInfo.disabled }
          : { ...color, disabled: false },
      ),
    );
    if (colorInfo.disabled === true) {
      setColor("");
      setColorID("");
    } else {
      setColor(colorInfo.color);
      setColorID(colorInfo.id);
    }
  };

  return (
    <div className="flex place-content-center h-screen p-4 font-redHatText">
      <div className="flex flex-col gap-6 max-w-[430px]">
        <h1 className="font-bold">Exchange of Gifts</h1>

        <div className="w-full max-w-sm min-w-[200px] flex flex-col gap-3">
          <p>
            Enter your email here and submit you email to be able to view the
            color options
          </p>
          <label className="block text-sm text-slate-600">
            Email
            <p className="text-sm text-red-600">{msg}</p>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter email here..."
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-3 py-2 rounded-lg"
            onClick={() => fetchColors(email)}
          >
            Submit Email
          </button>
        </div>

        {colors.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h1>
                Click one of the circles below to make a choice. The colors
                which have low opacity which cannot be clicked have already been
                chosen
              </h1>
              <UserColorPool colors={colors} handleClick={handleColorChange} />
            </div>

            <UserResponse color={color} />

            <div>
              <button
                disabled={color === "" ? true : false}
                className="bg-green-600 text-white px-3 py-2 rounded-lg disabled:bg-green-200"
                onClick={handleSubmitColorResponse}
              >
                Submit Color
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
