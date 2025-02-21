import Header from "@/components/Header";
import React from "react";

const UserOrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default UserOrderLayout;
