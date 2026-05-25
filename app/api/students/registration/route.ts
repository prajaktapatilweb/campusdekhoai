import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Otp from "@/models/otp";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    console.log("Origin:", origin);
    if (origin !== process.env.NEXT_PUBLIC_WEB_BASE_URL) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    // Honeypot
    if (body.website) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    await connectDB();

    const existing = await Student.findOne({
      phone: body.phone,
    });
    if (existing) {
      return NextResponse.json(
        {
          message: "Phone already registered",
        },
        { status: 400 },
      );
    }
    const verifiedOtp = await Otp.findOne({
      phone: body.phone,
      verified: true,
    });

    if (!verifiedOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone not verified",
        },
        {
          status: 401,
        },
      );
    }

    const student = await Student.create({
      ...body,

      verified: true,
      createdAt: new Date(),

      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    });
    await Otp.deleteMany({ phone: body.phone });
    return NextResponse.json({
      success: true,
      insertedId: student.insertedId,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
