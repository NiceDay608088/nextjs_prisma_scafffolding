import Header from "@/components/Header";
import React from "react";

const UserOrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col h-full">
      <Header />
      <div className=" h-full">{children}</div>
    </div>
  );
};

export default UserOrderLayout;
