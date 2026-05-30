import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { sendRegistrationConfirmationViaCM } from "@/lib/Whatsapp/sendRegConfirm";
import Event from "@/models/Event";
import Student from "@/models/Student";

// This is a setup route to create initial admin/staff users
// In production, you should remove this or protect it

export async function GET() {
  try {
    // await connectDB(); // Ensure DB is connected
    console.log("Reached Route");

    // Check if users already exist
    // console.log(result?.data);

    await connectDB();

    const events = await Event.find();

    for (const event of events) {
      const result = await Student.updateMany(
        {
          evenetLocation: event.city,
          eventId: { $exists: false },
        },
        {
          $set: {
            eventId: event._id,
          },
        },
      );
      console.log("REsult", result);
    }
    return NextResponse.json({
      success: true,
      message: "Work Done",
    });
  } catch (error) {
    console.error("Error setting up users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send whatsapp message to users" },
      { status: 500 },
    );
  }
}
