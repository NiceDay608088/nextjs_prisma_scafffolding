import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY, X_USER_ID } from "./utils/constants";
import { verifyToken } from "./utils/jwt-util";

const urlsToSkip = [
  "/api/user/login",
  "/api/user/register",
  "/api/user/logout",
];

const urlsMapToSkip = [{ method: "post", url: "/api/users" }];

const isSkip = (request: NextRequest) => {
  const url = new URL(request.url);
  console.log({
    pathname: url.pathname.toLowerCase(),
    method: request.method.toLowerCase(),
  });
  let r = urlsToSkip.some((urlToSkip) => url.pathname === urlToSkip);
  if (r) {
    return true;
  }

  r = urlsMapToSkip.some(
    (urlToSkip) =>
      urlToSkip.method.toLowerCase() === request.method.toLowerCase() &&
      url.pathname.toLowerCase() === urlToSkip.url.toLowerCase()
  );
  return r;
};

export async function middleware(request: NextRequest) {
  if (isSkip(request)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_KEY)?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: Token is missing or invalid" },
      { status: 401 }
    );
  }

  try {
    const payload = await verifyToken(token);

    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token}`);

    const response = NextResponse.next({ request: { headers } });
    response.headers.set(X_USER_ID, payload.userId);
    return response;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
