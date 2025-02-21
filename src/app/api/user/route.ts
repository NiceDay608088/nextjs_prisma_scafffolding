import { createUser } from "@/services/user-service";
import { resError_500 } from "@/utils/server-res-util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const id = await createUser({
      username,
      password,
    });
    return NextResponse.json(id);
  } catch (e: any) {
    return resError_500(e.error);
  }
}
