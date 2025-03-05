import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { format } from "date-fns";

interface HomeUserListItemProp {
  id: number;
  username: string;
  cDate: Date;
  isSelected: boolean;
  onCheckboxChange: () => void;
  onClick: () => void;
}

const HomeUserListItem = ({
  id,
  username,
  cDate,
  isSelected,
  onCheckboxChange,
  onClick,
}: HomeUserListItemProp) => {
  return (
    <TableRow
      onClick={(e) => {
        if (!(e.target instanceof HTMLInputElement)) {
          onClick();
        }
      }}
    >
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
        />
      </TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{format(cDate, "yyyy-MM-dd HH:mm:ss")}</TableCell>
    </TableRow>
  );
};

export default HomeUserListItem;
