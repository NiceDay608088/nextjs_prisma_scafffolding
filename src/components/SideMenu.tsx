import React from "react";

interface SideMenuProp {
  children: React.ReactNode;
  isOpen: boolean;
}

const SideMenu = ({ children, isOpen }: SideMenuProp) => {
  return (
    <div
      className={`fixed top-0 right-0 h-screen w-80 bg-white transition-transform duration-200 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } shadow-lg`}
    >
      {children}
    </div>
  );
};

export default SideMenu;
