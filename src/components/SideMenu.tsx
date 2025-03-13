import React from "react";

interface SideMenuProp {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

const SideMenu = ({ children, isOpen, className = "" }: SideMenuProp) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
      )}
      <div
        className={`fixed top-0 right-0 h-screen z-50 w-96 bg-white transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default SideMenu;
