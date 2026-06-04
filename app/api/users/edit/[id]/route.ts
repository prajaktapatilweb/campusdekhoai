import { NextRequest, NextResponse } from "next/server";

import UserModel from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";
import bcrypt from "bcryptjs";

export const PUT = withAuth(
  async (req, user, { params }: { params: Promise<{ id: string }> }) => {
    try {
      if (user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 403 },
        );
      }

      await connectDB();

      const { id } = await params;

      const body = await req.json();
      const { name, email, password, phone, role, allowedEvents } = body;
      const updateData: any = {
        name,
        email: email.toLowerCase(),
        phone,
        role,
        allowedEvents,
      };

      if (password?.trim()) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const response = await UserModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "User updated successfully",
          data: response,
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
