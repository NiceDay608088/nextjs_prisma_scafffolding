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

    if (!user) {
      return resError_400("User doesn't exist.");
    }

    if (!(await comparePassword(password, user.password))) {
      return resError_400("Password is wrong.");
    }

    const { authCookie, userDataCookie } = generateServerCookies(
      signToken(user.id.toString()),
      null,
      user.username
    );

    const response = NextResponse.json({});
    response.headers.append("Set-Cookie", authCookie);
    response.headers.append("Set-Cookie", userDataCookie);
    return response;
  } catch (error: any) {
    return resError_500("Failed to fetch user");
  }
}
