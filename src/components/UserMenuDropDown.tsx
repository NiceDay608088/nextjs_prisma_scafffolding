import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { postRequest } from "@/utils/request-util";

const UserMenuDropDown = ({ username }: { username: string }) => {
  const router = useRouter();

  const logout = () => {
    postRequest("/user/logout");
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center gap-2">
            <span>{username}</span>
            <ChevronDown size={10} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-sm cursor-pointer" onClick={logout}>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDropDown;
