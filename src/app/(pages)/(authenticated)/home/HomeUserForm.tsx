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
import { deleteRequest, getRequest } from "@/utils/request-util";
import PagingContainer from "@/components/PagingContainer";

interface HomeUserFilterType {
  username: string;
  currentPage: number;
}

interface HomeUserItemType {
  id: number;
  username: string;
  cDate: Date;
}

interface HomeUserPagingDataType {
  pages: number;
  currentPage: number;
  totalCount: number;
  users: HomeUserItemType[];
}

const HomeUserForm = () => {
  const [filter, setFilter] = useState<HomeUserFilterType>({
    username: "",
    currentPage: 1,
  });
  const [pagingData, setPagingData] = useState<HomeUserPagingDataType>({
    pages: 0,
    currentPage: 1,
    totalCount: 0,
    users: [],
  });
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filterUsers = async (currentPage: number) => {
    const pagingUsers = await getRequest("/user", { ...filter, currentPage });
    setPagingData(pagingUsers);
  };

  useEffect(() => {
    filterUsers(1);
  }, []);

  const handleCheckboxChange = (id: number) => {
    console.log("handleRowChange", id);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (id: number) => {
    console.log("handleRowClick", id);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === pagingData.users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pagingData.users.map((row) => row.id));
    }
  };

  const handleMassDelete = async () => {
    console.log("Deleting rows with IDs:", selectedIds);
    const pagingUsers = await deleteRequest("/user", {
      ids: selectedIds,
      ...filter,
    });
    console.log(pagingUsers);
    setSelectedIds([]);
    setPagingData(pagingUsers);
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
        <Button onClick={() => filterUsers(1)}>Search</Button>
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
            {pagingData.users.map((row) => (
              <HomeUserListItem
                key={row.id}
                {...row}
                isSelected={selectedIds.includes(row.id)}
                onCheckboxChange={() => handleCheckboxChange(row.id)}
                onClick={() => handleRowClick(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <PagingContainer
        pages={pagingData.pages}
        totalCount={pagingData.totalCount}
        currentPage={pagingData.currentPage}
        onSelect={(currentPage: number) => {
          console.log("clicking on page:", currentPage);
          filterUsers(currentPage);
        }}
      />
    </div>
  );
};

export default HomeUserForm;
