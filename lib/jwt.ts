import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function createToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      return {
        success: false,
        error: "MISSING_TOKEN",
        status: 401,
        decoded: null,
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    return {
      success: true,
      decoded,
      error: null,
      status: 200,
    };
  } catch (err: any) {
    return {
      success: false,
      decoded: null,
      error:
        err instanceof TokenExpiredError ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      status: 401,
    };
  }
}
