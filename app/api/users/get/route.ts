import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// ================= CREATE EVENT =================

export async function GET() {
  try {
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
}
