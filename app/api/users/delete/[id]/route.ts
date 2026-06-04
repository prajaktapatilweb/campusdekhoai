import { NextRequest, NextResponse } from "next/server";

import UserModel from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

// ================= DELETE User =================

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

      const body = await req.json();

      await connectDB();

      const { id } = await params;

      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (!deletedUser) {
        return NextResponse.json(
          {
            success: false,
            message: "User not found",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "User deleted successfully",
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
