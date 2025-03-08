"use client";

import { ProgressBar, ProgressBarProvider } from "@/components/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
import store from "@/stores/store";
import React from "react";
import { Provider } from "react-redux";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ProgressBarProvider>
        <ProgressBar />
        {children}
      </ProgressBarProvider>
      <Toaster />
    </Provider>
  );
};

export default LayoutWrapper;
