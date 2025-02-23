import { getUserByName } from "@/services/user-service";
import { comparePassword } from "@/utils/encrypt-util";
import { signToken } from "@/utils/jwt-util";
import { generateServerCookies } from "@/utils/server-cookie-util";
import { resError_400, resError_500 } from "@/utils/server-response-error-util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  if (!username || !password) {
    return resError_400("Username and password are required");
  }

  try {
    const user = await getUserByName(username);
    console.log("111");
    if (!user) {
      return resError_400("User doesn't exist.");
    }
    console.log("222");
    if (!(await comparePassword(password, user.password))) {
      return resError_400("Password is wrong.");
    }
    console.log("333");
    const { authCookie, userDataCookie } = generateServerCookies(
      signToken(user.id.toString()),
      null,
      user.username
    );
    console.log("444");
    const response = NextResponse.json({ id: user.id });
    response.headers.append("Set-Cookie", authCookie);
    response.headers.append("Set-Cookie", userDataCookie);
    return response;
  } catch (error: any) {
    return resError_500("Failed to fetch user");
  }
}
