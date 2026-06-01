import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Student from "@/models/Student";
import Otp from "@/models/otp";
import Event from "@/models/Event";
import { sendRegistrationConfirmationViaCM } from "@/lib/Whatsapp/sendRegConfirm";
import { generateSeqId } from "@/lib/GenerateIds";
import moment from "moment";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    console.log("Origin:", origin);
    // if (origin !== process.env.NEXT_PUBLIC_WEB_BASE_URL) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    // }
    const body = await req.json();
    console.log("RRRRREE", body);
    // // Honeypot
    // if (body.whatsapp !== "") {
    //   return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    // }

    await connectDB();

    // Check same student duplicate
    const existingStudent = await Student.findOne({
      phone: body.phone,
      fullname: body.fullname,
    });

    if (existingStudent) {
      return NextResponse.json(
        {
          success: false,
          message: "Student already registered with this phone number.",
        },
        { status: 400 },
      );
    }

    // Allow maximum 2 registrations per phone
    const registrationCount = await Student.countDocuments({
      phone: body.phone,
    });

    if (registrationCount >= 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum 2 registrations are allowed per mobile number.",
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

    body.regId = await generateSeqId("StudRegistration", "PudhariC2C");
    console.log("Body to submit", body);

    const student = await Student.create({
      ...body,
      verified: true,
      createdAt: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || "unknown",
    });

    const eventDetails = await Event.findOne({ city: body.evenetLocation });
    console.log("Event details found", eventDetails);
    const startTime = eventDetails
      ? moment(eventDetails.startDateTime).utcOffset("+05:30")
      : null;

    const endTime = eventDetails
      ? moment(eventDetails.endDateTime).utcOffset("+05:30")
      : null;

    const dayDate = startTime ? startTime.format("dddd, DD MMMM YYYY") : "";

    const time =
      startTime && endTime
        ? `${startTime.format("h:mm A")} to ${endTime.format("h:mm A")}`
        : "04:00 PM to 06:00 PM";

    console.log("Formatted date and time", dayDate, time);

    const result = await sendRegistrationConfirmationViaCM({
      phone: body.phone,
      name: body.fullname,
      regNo: String(body.regId),
      venue: eventDetails
        ? `${eventDetails.venue}, ${eventDetails.city}`
        : body.evenetLocation,
      dayDate: String(dayDate),
      time: String(time),
      // imageUrl: "https://pudhariedudisha.com/favicon.png",
      // contactName: "Atul",
      // contactPhone: "99",
    });

    // if (!result.success) {
    //   return NextResponse.json(
    //     { success: false, error: result.error },
    //     { status: 500 },
    //   );
    // }

    await Otp.deleteMany({ phone: body.phone });
    return NextResponse.json({
      success: true,
      insertedId: student._id,
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
