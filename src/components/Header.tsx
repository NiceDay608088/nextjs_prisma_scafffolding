"use client";

import { getClientCookies } from "@/utils/cookie-util";
import React, { useLayoutEffect, useState } from "react";

const Header = () => {
  const [username, setUsername] = useState("");

  useLayoutEffect(() => {
    const cookies = getClientCookies();
    // console.log(cookies);
    if (cookies.username) {
      setUsername(cookies.username);
    } else {
    }
  }, []);

  return (
    <div className="fixed flex justify-between items-center px-4 h-12 bg-blue-500 text-white w-full ">
      <span>Header</span>
      <span>{username}</span>
    </div>
  );
};

export default Header;
