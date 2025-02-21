import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";
import { TOKEN_EXPIRE_SEC } from "@/utils/constants";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET!;

const JwtDataSchema = z.object({
  userId: z.string(),
  iat: z.number(),
  exp: z.number(),
});

type JwtData = z.infer<typeof JwtDataSchema>;

function isJwtData(payload: unknown): payload is JwtData {
  return JwtDataSchema.safeParse(payload).success;
}

export function signToken(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRE_SEC,
  });
  return token;
}

export async function verifyToken(token: string): Promise<JwtData> {
  const result = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
  const payload = result.payload;

  if (isJwtData(payload)) {
    return payload as JwtData;
  }

  throw new Error("Invalid token payload");
}
