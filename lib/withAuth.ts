import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { connectDB } from "@/lib/mongodb";

interface AuthUser {
  id: string;
  role: string;
  email: string;
  name: string;
}

type RouteHandler = (
  req: NextRequest,
  user: AuthUser,
  ...args: any[]
) => Promise<NextResponse>;

export function withAuth(handler: RouteHandler) {
  return async function (
    req: NextRequest,
    ...args: any[]
  ): Promise<NextResponse> {
    try {
      console.log("Current PathName", req.url);
      // 1. Verify the Token
      const authResult = verifyToken(req);
      console.log("USER in withAuth", authResult);
      // 2. If helper returned an error (Expired or Invalid)
      if (!authResult.success || !authResult.decoded) {
        return NextResponse.json(
          { success: false, message: authResult.error },
          { status: authResult.status || 401 },
        );
      }
      // 3. Connect to Database (Serverless friendly)
      await connectDB();
      // 4. Pass the decoded user to the handler
      // We pass authResult.decoded so the route knows WHO is calling
      return handler(req, authResult.decoded as AuthUser, ...args);
    } catch (err) {
      console.error("Critical Auth Middleware Error:", err);
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        {
          status: 500,
        },
      );
    }
  };
}
