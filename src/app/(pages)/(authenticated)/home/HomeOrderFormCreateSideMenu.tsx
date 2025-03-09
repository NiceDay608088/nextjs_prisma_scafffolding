import SideMenu from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import React from "react";

interface OrderCreateSideMenuProp {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

const HomeOrderFormCreateSideMenu = ({
  isOpen,
  onSave,
  onClose,
}: OrderCreateSideMenuProp) => {
  console.log("HomeOrderFormCreateSideMenu", isOpen);
  return (
    <SideMenu isOpen={isOpen}>
      <div>aaa</div>
      <div className="flex items-center justify-between px-4">
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </SideMenu>
  );
};

export default HomeOrderFormCreateSideMenu;
