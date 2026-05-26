import { NextRequest, NextResponse } from "next/server";
import Axios from "axios";

import { connectDB } from "@/lib/mongodb";
import Otp from "@/models/otp";

import { otpRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const phone = body.phone;

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

    // =========================
    // CHECK EXISTING OTP
    // =========================

    const existingOtp = await Otp.findOne({ phone });

    // =========================
    // OTP COOLDOWN
    // =========================

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

    // =========================
    // GENERATE OTP
    // =========================

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5 min expiry
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 45 sec cooldown
    const cooldownUntil = new Date(Date.now() + 45 * 1000);

    // Delete old OTP
    await Otp.deleteMany({ phone });

    // Save new OTP
    await Otp.create({
      phone,
      otp,
      verified: false,
      attempts: 0,
      expiresAt,
      cooldownUntil,
    });

    // =========================
    // SEND WHATSAPP OTP
    // =========================

    console.log("OTP:", otp);

    await Axios.post(
      "https://backend.chatmitra.com/developer/api/send_message",
      {
        recipient_mobile_number: `91${phone}`,
        messages: [
          {
            kind: "template",
            template: {
              name: "campus2career_otp",
              language: "en",
              components: [
                { type: "body", parameters: [{ type: "text", text: otp }] },
              ],
            },
          },
        ],
        // customer_name: "YOUR_CUSTOMER_NAME",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATMITRA_API_KEY}`,
        },
      },
    );

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
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
