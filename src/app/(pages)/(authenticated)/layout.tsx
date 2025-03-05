"use client";
import Header from "@/components/Header";
import store from "@/stores/store";
import React from "react";
import { Provider } from "react-redux";

const UserOrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div className=" flex flex-col h-full">
        <Header />
        <div className=" h-full">{children}</div>
      </div>
    </Provider>
  );
};

export default UserOrderLayout;
