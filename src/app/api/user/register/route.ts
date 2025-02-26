import { createUser } from "@/services/userService";
import { resError_400, resError_500 } from "@/utils/server-response-error-util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return resError_400("Username and password are required");
  }

  try {
    const user = await createUser({ username, password });
    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    return resError_500("Failed to fetch user");
  }
}
