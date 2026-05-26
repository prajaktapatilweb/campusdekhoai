import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { withAuth } from "@/lib/withAuth";

// ================= CREATE EVENT =================

export const GET = withAuth(async (req, user) => {
  try {
    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        },
      );
    }
    await connectDB();

    const data = await User.find().sort({
      createdAt: -1,
      password: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
});
