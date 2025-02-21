import { NextResponse } from "next/server";
import { printErrorLog } from "./error-util";

export const resError_400 = (e: any) => {
  printErrorLog(e);
  return NextResponse.json(
    {
      error: "Bad Request",
      message: e.message,
    },
    { status: 400 }
  );
};

export const resError_500 = (e: any) => {
  printErrorLog(e);
  return NextResponse.json(
    {
      error: "Internal Server Error",
      message: e.message,
    },
    { status: 500 }
  );
};
