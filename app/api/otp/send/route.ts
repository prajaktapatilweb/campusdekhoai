import { NextRequest, NextResponse } from "next/server";
import Axios from "axios";

import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/otp";

import { otpRateLimit } from "@/lib/rateLimit";
import { sendOtpViaChatMitra, sendOtpViaMeta } from "@/lib/Whatsapp/sendOtp";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("RRRR", body);
    const { fullname, email, phone } = body;

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone required",
        },
        {
          status: 400,
        },
      );
    }

    // =========================
    // RATE LIMIT
    // =========================

    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";

    const { success } = await otpRateLimit.limit(ip);
    console.log("RREacher 1");
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many OTP requests. Try later.",
        },
        {
          status: 429,
        },
      );
    }
    console.log("RREacher 2");

    // =========================
    // CHECK EXISTING OTP
    // =========================

    const existingOtp = await Otp.findOne({ phone });

    // =========================
    // OTP COOLDOWN
    // =========================
    console.log("RREacher 3", existingOtp);

    if (
      existingOtp &&
      existingOtp.cooldownUntil &&
      new Date() < existingOtp.cooldownUntil
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Wait before requesting another OTP",
        },
        {
          status: 429,
        },
      );
    }
    console.log("RREacher 4");

    // =========================
    // GENERATE OTP
    // =========================

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5 min expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 45 sec cooldown
    const cooldownUntil = new Date(Date.now() + 45 * 1000);
    console.log("RREacher 5");

    // Delete old OTP
    await Otp.deleteMany({ phone });

    // Save new OTP
    await Otp.create({
      phone,
      name: fullname,
      email,
      otp,
      verified: false,
      attempts: 0,
      expiresAt,
      cooldownUntil,
    });
    console.log("RREacher 6");

    // =========================
    // SEND WHATSAPP OTP
    // =========================

    console.log("OTP:", otp);

    // const result = await sendOtpViaMeta({ phone, otp });
    const result = await sendOtpViaChatMitra({ phone, otp });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error: any) {
    console.log(
      "ChatMitra Error:",
      error,
      JSON.stringify(error.response?.data, null, 2),
    );
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
