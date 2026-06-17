import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    //  * RAW BODY REQUIRED FOR HMAC
    const rawBody = await req.json();
    console.log(
      "📥 Raw Zoom Webhook Payload Received:",
      JSON.stringify(rawBody, null, 2),
    );

    // ==========================================
    // 1. HANDLE ZOOM ENDPOINT URL VALIDATION
    // ==========================================
    // if (rawBody.event === "endpoint.url_validation") {
    //   const plainToken = rawBody.payload.plainToken;

    //   // Hash the plainToken using your Zoom Secret Token via HMAC-SHA256
    //   const encryptedToken = crypto
    //     .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET_TOKEN)
    //     .update(plainToken)
    //     .digest("hex");

    //   console.log("✅ Responding to Zoom URL validation challenge.");
    //   return NextResponse.json({ plainToken, encryptedToken }, { status: 200 });
    // }

    // if (!isValid) {
    //   return NextResponse.json(
    //     { success: false, message: "Invalid webhook signature" },
    //     { status: 401 },
    //   );
    // }

    // if (!senderNumber) {
    //   return NextResponse.json(
    //     { success: false, message: "Sender number missing" },
    //     { status: 400 },
    //   );
    // }

    // let cleanNumber = senderNumber.replace(/\D/g, "");
    // if (cleanNumber.startsWith("91")) {
    //   cleanNumber = cleanNumber.slice(2);
    // }
    // console.log("Numbers", senderNumber, cleanNumber);

    // const replyMessage = QUICK_REPLY_MESSAGES[messageKey]
    //   ? QUICK_REPLY_MESSAGES[messageKey]({
    //       fullname: student.fullname,
    //       eventLocation,
    //       whatsappGroupLink,
    //     })
    //   : defaultReply({ fullname: student.fullname });

    // const response = await fetch(
    //   "https://backend.chatmitra.com/developer/api/send_message",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.CHATMITRA_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       recipient_mobile_number: `91${cleanNumber}`,
    //       messages: [
    //         {
    //           kind: "raw",
    //           payload: {
    //             type: "text",
    //             text: {
    //               body: String(replyMessage),
    //             },
    //           },
    //         },
    //       ],
    //     }),
    //   },
    // );

    // const responseData = await response.json();
    // console.log("RRRR", responseData);

    return NextResponse.json(
      {
        success: true,
        message: "Data successfully received and logged.",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("❌ Webhook Handling Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
