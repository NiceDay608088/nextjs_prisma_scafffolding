"use client";

import useAuthCheck from "@/hooks/useAuthCheck";
import React from "react";

const Header = () => {
  const username = useAuthCheck();

  return (
    <div className="fixed flex justify-between items-center px-4 h-12 bg-slate-300  w-full ">
      <span>Header</span>
      <span>{username}</span>
    </div>
  );
};

export default Header;
