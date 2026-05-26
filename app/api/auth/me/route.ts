import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/lib/jwt";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

interface JWTPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

export async function GET(request: NextRequest) {
  try {
    const auth = verifyToken(request);

    if (!auth.success || !auth.decoded) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status },
      );
    }
    return NextResponse.json({
      success: true,
      user: auth.decoded,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 401 },
    );
  }
}
