import { NextResponse } from "next/server";

export const resError_400 = (message: string) => {
  console.error(message);
  return NextResponse.json(
    {
      error: "Bad Request",
      message,
    },
    { status: 400 }
  );
};

export const resError_500 = (message: string) => {
  console.error(message);
  return NextResponse.json(
    {
      error: "Internal Server Error",
      message,
    },
    { status: 500 }
  );
};
