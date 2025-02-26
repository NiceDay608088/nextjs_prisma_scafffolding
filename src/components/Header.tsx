"use client";

import useAuthCheck from "@/hooks/useAuthCheck";
import React from "react";
import UserMenuDropDown from "./UserMenuDropDown";

const Header = () => {
  const username = useAuthCheck();

  return (
    <div className="flex justify-between items-center px-4 h-12 bg-gray-100  w-full ">
      <span>Header</span>
      <span>
        <UserMenuDropDown username={username} />
      </span>
    </div>
  );
};

export default Header;
