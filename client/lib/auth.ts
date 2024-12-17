// lib/auth.ts
import { jwtVerify } from "jose";
interface TokenPayload {
  email?: string;
  [key: string]: any;
}

export async function verifyToken(token?: string) {
  if (!token) {
    throw new Error("No token provided");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  const secretKey = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const typedPayload: TokenPayload = payload;
    return typedPayload;
  } catch {
    throw new Error(`Token verification failed}`);
  }
}
