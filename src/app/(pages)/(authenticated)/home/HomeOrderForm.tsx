"use client";

import React, { useEffect, useState } from "react";
import apolloClient from "@/lib/apolloClient";
import { Menu } from "lucide-react";
import { useProgressBar } from "@/components/ProgressBar";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import HomeOrderFormFilter from "./HomeOrderFormFilter";
import HomeOrderFormButtonRow from "./HomeOrderFormButtonRow";

export interface HomeOrderFilterType {
  orderName: string;
  categories: string[];
  labels: string[];
  cDateFrom: Date | undefined;
  cDateTo: Date | undefined;
  maxAmount: number | null;
  minAmount: number | null;
}
const initFilter = {
  orderName: "",
  categories: [],
  labels: [],
  cDateFrom: undefined,
  cDateTo: undefined,
  maxAmount: null,
  minAmount: null,
};

const OrderForm = () => {
  const { username, userId } = useSelector((state: RootState) => state.user);
  const { startProgress, stopProgress } = useProgressBar();
  const [filter, setFilter] = useState<HomeOrderFilterType>(initFilter);

  useEffect(() => {
    clearSearch();
  }, [userId]);

  useEffect(() => {
    console.log({ userId, filter });
  }, [filter]);

  const createOrder = () => {};

  const deleteOrder = () => {};

  const searchOrder = () => {};

  const clearSearch = () => {
    setFilter(initFilter);
  };
  // const { confirmPassword, ...mutationVariables } = values;
  // console.log(mutationVariables);
  // try {
  //   const response: any = await apolloClient.mutate({
  //     mutation: CREATE_USER,
  //     variables: { ...mutationVariables },
  //   });
  //   showToast({ message: "Success", type: "success" });
  //   console.log(".....", response.data.createUser);
  // } catch (error: any) {
  //   showToast({ message: "Error", type: "error" });
  //   setError(error.message);
  //   console.log(".....", error);
  // } finally {
  //   reset();
  // }

  return (
    <div className="w-full h-full flex flex-col gap-8 border-slate-100 border-2 rounded p-6">
      <div className="flex items-center gap-2 text-slate-700">
        <Menu size={20} /> <span className="text-lg">Orders</span>
      </div>
      <HomeOrderFormFilter
        filter={filter}
        setFilter={setFilter}
        username={username}
      />
      <HomeOrderFormButtonRow
        userId={userId}
        createOrder={createOrder}
        deleteOrder={deleteOrder}
        searchOrder={searchOrder}
        clearSearch={clearSearch}
      />
    </div>
  );
};

export default OrderForm;
