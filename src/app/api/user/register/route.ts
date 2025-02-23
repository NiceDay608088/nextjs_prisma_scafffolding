// app/api/register/route.ts
import { createUser } from "@/services/user-service";
import { resError_400, resError_500 } from "@/utils/server-response-error-util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return resError_400("Username and password are required");
  }

  try {
    await createUser({ username, password });
    return NextResponse.json({});
  } catch (error: any) {
    return resError_500("Failed to fetch user");
  }
}
