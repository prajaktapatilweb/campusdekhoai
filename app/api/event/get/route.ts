import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/models/Event";
import { connectDB } from "@/lib/mongodb";

// ================= CREATE EVENT =================

export async function GET() {
  try {
    await connectDB();

    const events = await EventModel.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: events,
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
