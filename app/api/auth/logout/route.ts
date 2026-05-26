import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set({
    name: "auth-token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
