import { COOKIE_KEY_USER_DATA, X_USER_ID } from "./constants";
import { serialize } from "cookie";
import { TOKEN_EXPIRE_SEC, TOKEN_KEY } from "@/utils/constants";

export const getUserIdFromReq = (req: Request) => {
  return req.headers.get(X_USER_ID);
};

export const generateServerCookies = (
  jwtToken: string,
  userEmail: string | null,
  userName: string | null
) => {
  const authCookie = createCookie(TOKEN_KEY, jwtToken, true);
  const userDataCookie = createCookie(
    COOKIE_KEY_USER_DATA,
    JSON.stringify({
      email: userEmail,
      name: userName,
    }),
    false
  );

  return { authCookie, userDataCookie };
};

// httpOnly = true, client js cannot modify the cookie value.
const createCookie = (key: string, value: string, httpOnly: boolean) => {
  return serialize(key, value, {
    httpOnly,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: TOKEN_EXPIRE_SEC,
    path: "/",
  });
};
