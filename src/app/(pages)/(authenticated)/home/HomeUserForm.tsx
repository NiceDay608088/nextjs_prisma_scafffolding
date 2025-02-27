"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import HomeUserListItem from "./HomeUserListItem";
import { deleteRequest, getRequest, postRequest } from "@/utils/request-util";

interface HomeUserFilterType {
  username: string;
  currentPage: number;
}

interface HomeUserDataType {
  id: number;
  username: string;
  cDate: Date;
}

const HomeUserForm = () => {
  const [filter, setFilter] = useState<HomeUserFilterType>({
    username: "",
    currentPage: 1,
  });
  const [data, setData] = useState<HomeUserDataType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filterUsers = async () => {
    const pagingUsers = await getRequest("/user", { ...filter });
    setData(pagingUsers.users);
  };

  useEffect(() => {
    filterUsers();
  }, []);

  const handleRowSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((row) => row.id));
    }
  };

  const handleMassDelete = async () => {
    console.log("Deleting rows with IDs:", selectedIds);
    setData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    const pagingUsers = await deleteRequest("/user", {
      ids: selectedIds,
      ...filter,
    });
    setSelectedIds([]);
    setData(pagingUsers.users);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 border-slate-100 border-2 rounded p-6">
      <div className="flex items-center gap-1 text-slate-700">
        <User2 size={20} /> <span className="text-lg">Users</span>
      </div>
      <div className="flex gap-6 items-center">
        Name:
        <Input
          value={filter.username}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <Button onClick={filterUsers}>Search</Button>
        <Button variant="destructive" onClick={handleMassDelete}>
          Delete
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">
                <input type="checkbox" onChange={handleSelectAll} />
              </TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <HomeUserListItem
                key={row.id}
                {...row}
                isSelected={selectedIds.includes(row.id)}
                onSelect={() => handleRowSelect(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomeUserForm;
