import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/models/Event";
import { connectDB } from "@/lib/mongodb";

// ================= CREATE EVENT =================

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const event = await EventModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: event,
      },
      { status: 201 },
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
