import { NextRequest, NextResponse } from "next/server";

import UserModel from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";
import bcrypt from "bcryptjs";

// ================= CREATE USER =================

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    //  Optional Role Check
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 },
      );
    }
    console.log("Reached to POST", user);

    await connectDB();

    const body = await req.json();
    console.log("Received body:", body);

    const { name, email, phone, role, allowedEvents } = body;

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 400 },
      );
    }
    const password = body.password || "admin@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      role,
      allowedEvents,
      createdBy: user.id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: response,
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
