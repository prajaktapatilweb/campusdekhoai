import { NextRequest, NextResponse } from "next/server";

import EventModel from "@/models/Event";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

export const PUT = withAuth(
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

      const body = await req.json();

      const updatedEvent = await EventModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatedEvent) {
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
          message: "Event updated successfully",
          data: updatedEvent,
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
