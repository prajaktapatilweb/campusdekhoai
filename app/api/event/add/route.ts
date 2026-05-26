import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

// ================= CREATE EVENT =================

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    //  Optional Role Check
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

    const body = await req.json();

    const event = await EventModel.create({ ...body, createdBy: user.id });

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
});
