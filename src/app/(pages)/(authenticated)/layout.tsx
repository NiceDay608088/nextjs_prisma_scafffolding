"use client";
import Header from "@/components/Header";
import { ProgressBar, ProgressBarProvider } from "@/components/ProgressBar";
import store from "@/stores/store";
import React from "react";
import { Provider } from "react-redux";

const UserOrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ProgressBarProvider>
        <ProgressBar />
        <div className=" flex flex-col h-full">
          <Header />
          <div className=" h-full">{children}</div>
        </div>
      </ProgressBarProvider>
    </Provider>
  );
};

export default UserOrderLayout;
