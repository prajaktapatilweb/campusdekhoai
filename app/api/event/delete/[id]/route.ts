import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

// ================= DELETE EVENT =================

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> },
// ) {
export const DELETE = withAuth(
  async (req, user, { params }: { params: Promise<{ id: string }> }) => {
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

      const { id } = await params;

      const deletedEvent = await EventModel.findByIdAndDelete(id);

      if (!deletedEvent) {
        return NextResponse.json(
          {
            success: false,
            message: "Event not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Event deleted successfully",
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
  },
);
