import { NextRequest, NextResponse } from "next/server";
import { GRAPHQL_ENDPOINT, TOKEN_KEY, X_USER_ID } from "./utils/constants";
import { verifyToken } from "./utils/jwt-util";

const restfulPathsToSkip = [
  "/api/user",
  "/api/user/login",
  "/api/user/register",
  "/api/user/logout",
];

const graphqlOperationsToSkip = ["CreateUser", ""];

const isSkipRestfulRequest = (request: NextRequest) => {
  if (request.nextUrl.pathname !== GRAPHQL_ENDPOINT) {
    return restfulPathsToSkip.some((path) => request.nextUrl.pathname === path);
  }
  return false;
};

const isSkipGraphqlRequest = (request: NextRequest, body: any) => {
  if (request.nextUrl.pathname === GRAPHQL_ENDPOINT) {
    return graphqlOperationsToSkip.some(
      (operation) => operation === body.operationName
    );
  }
  return false;
};

const isSkipSecurityCheck = () => {
  if (!process.env.IS_ENABLE_API_SECURITY) {
    return false;
  }

  return process.env.IS_ENABLE_API_SECURITY.toLowerCase() === "false";
};

export async function middleware(request: NextRequest) {
  if (isSkipSecurityCheck()) {
    return NextResponse.next();
  }

  const contentLength = request.headers.get("content-length");
  const hasBody = contentLength && parseInt(contentLength) > 0;
  const body = hasBody ? await request.json() : "";

  console.log({
    pathname: request.nextUrl.pathname.toLowerCase(),
    method: request.method.toLowerCase(),
    body,
  });

  if (isSkipGraphqlRequest(request, body) || isSkipRestfulRequest(request)) {
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
