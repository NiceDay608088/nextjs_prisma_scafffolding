import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { format } from "date-fns";

interface HomeUserListItemProp {
  id: number;
  username: string;
  cDate: Date;
  isSelected: boolean;
  onSelect: () => void;
}

const HomeUserListItem = ({
  id,
  username,
  cDate,
  isSelected,
  onSelect,
}: HomeUserListItemProp) => {
  return (
    <TableRow>
      <TableCell>
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{format(cDate, "yyyy-MM-dd HH:mm:ss")}</TableCell>
    </TableRow>
  );
};

export default HomeUserListItem;
