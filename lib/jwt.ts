import User from "@/models/User";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function createToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function verifyToken(req: NextRequest) {
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
    const user = await User.findById(decoded.id).select("_id name email role");
    if (!user) {
      return {
        success: false,
        error: "USER_NOT_FOUND",
        status: 401,
        decoded: null,
      };
    }
    return {
      success: true,
      decoded: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
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
