import { NextResponse } from "next/server";
import { TOKEN_KEY, COOKIE_KEY_USER_DATA } from "@/utils/constants";
import { serialize } from "cookie";

/**
 * path: /api/logout
 */
export async function POST(req: Request) {
  const authCookie = serialize(TOKEN_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  const userDataCookie = serialize(COOKIE_KEY_USER_DATA, "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });

  const response = NextResponse.json({});
  response.headers.append("Set-Cookie", authCookie);
  response.headers.append("Set-Cookie", userDataCookie);

  return response;
}
