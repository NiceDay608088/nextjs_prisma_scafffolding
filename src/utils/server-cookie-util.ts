import { X_USER_ID } from "./constants";

export const getUserIdFromReq = (req: Request) => {
  return req.headers.get(X_USER_ID);
};
