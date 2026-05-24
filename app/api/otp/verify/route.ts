import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Otp from "@/models//otp";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        {
          status: 400,
        },
      );
    }
    const existingOtp = await Otp.findOne({ phone });

    if (!existingOtp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 400,
        },
      );
    }

    // Check expiry
    if (new Date() > existingOtp.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // MAX ATTEMPTS
    // =========================

    if (existingOtp.attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many wrong attempts",
        },
        {
          status: 429,
        },
      );
    }

    // =========================
    // WRONG OTP
    // =========================

    if (existingOtp.otp !== otp) {
      existingOtp.attempts += 1;

      await existingOtp.save();

      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
          attemptsLeft: 5 - existingOtp.attempts,
        },
        {
          status: 400,
        },
      );
    }
    // =========================
    // VERIFIED
    // =========================

    existingOtp.verified = true;

    await existingOtp.save();

    return NextResponse.json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
