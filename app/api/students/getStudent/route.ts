import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import Student from "@/models/Student";

import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET!);

    await connectDB();

    const students = await Student.find().sort({
      createdAt: -1,
    });
    console.log("Students fetched:", students.length);

    return NextResponse.json(
      {
        success: true,
        data: students,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
