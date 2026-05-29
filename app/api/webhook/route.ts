// src/app/api/chatmitra/webhook/route.ts

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import { EVENT_WHATSAPP_GROUPS } from "@/components/constants/eventWhatsappGroups";
import { defaultReply, QUICK_REPLY_MESSAGES } from "@/lib/Whatsapp/chatReplies";
type ReplyKey = keyof typeof QUICK_REPLY_MESSAGES;

function verifyWebhookSignature(body: string, signature: string | null) {
  const secret = process.env.CHATMITRA_WEBHOOK_SECRET;
  console.log("SECRET VALUE:", secret);
  if (!secret) {
    throw new Error("CHATMITRA_WEBHOOK_SECRET is missing");
  }
  if (!signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );
}

export async function POST(req: NextRequest) {
  try {
    //  * RAW BODY REQUIRED FOR HMAC
    const rawBody = await req.text();
    //  * GET SIGNATURE HEADER
    const signature = req.headers.get("x-webhook-signature");
    //  * VERIFY SIGNATURE
    const isValid = verifyWebhookSignature(rawBody, signature);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature" },
        { status: 401 },
      );
    }
    //  * PARSE BODY AFTER VERIFICATION
    const body = JSON.parse(rawBody);
    console.log("Webhook Body:", body);
    await connectDB();
    const senderNumber =
      body?.sender_mobile_number ||
      body?.mobile ||
      body?.from ||
      body?.data?.mobile;
    const quickReply =
      body?.quick_reply ||
      body?.button_reply ||
      body?.interactive?.button_reply?.title ||
      "";

    if (!senderNumber) {
      return NextResponse.json(
        { success: false, message: "Sender number missing" },
        { status: 400 },
      );
    }

    let cleanNumber = senderNumber.replace(/\D/g, "");
    if (cleanNumber.startsWith("91")) {
      cleanNumber = cleanNumber.slice(2);
    }
    console.log("Numbers", senderNumber, cleanNumber);

    const student = await Student.findOne({
      $or: [{ phone: cleanNumber }, { whatsapp: cleanNumber }],
    });
    console.log("DAta found", student);
    if (!student) {
      return NextResponse.json({
        success: false,
        message: "Student not found",
      });
    }

    const eventLocation = student?.evenetLocation;

    const whatsappGroupLink = EVENT_WHATSAPP_GROUPS[eventLocation] || "";
    console.log("Links and city", eventLocation, whatsappGroupLink);

    const incomingMessage = (body?.message?.text || body?.text || "")
      .trim()
      .toUpperCase();

    const messageKey = incomingMessage as ReplyKey;
    console.log("Message Received", messageKey);

    const replyMessage = QUICK_REPLY_MESSAGES[messageKey]
      ? QUICK_REPLY_MESSAGES[messageKey]({
          fullname: student.fullname,
          eventLocation,
          whatsappGroupLink,
        })
      : defaultReply({ fullname: student.fullname });

    const response = await fetch(
      "https://backend.chatmitra.com/developer/api/send_message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATMITRA_API_KEY}`,
        },
        body: JSON.stringify({
          recipient_mobile_number: `91${cleanNumber}`,
          messages: [
            {
              kind: "raw",
              payload: {
                type: "text",
                text: {
                  body: String(replyMessage),
                },
              },
            },
          ],
        }),
      },
    );

    const responseData = await response.json();
    console.log("RRRR", responseData);
    return NextResponse.json({
      success: true,
      responseData,
    });
  } catch (error: any) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
