import { NextResponse, NextRequest } from "next/server";
import moment from "moment";

import { connectDB } from "@/lib/mongodb";

import EventModel from "@/models/Event";
import StudentModel from "@/models/Student";
import ReminderLogModel from "@/models/ReminderLog";

// import your whatsapp function
// import { sendWhatsAppTemplate } from "@/lib/whatsapp";

async function sendReminder(event: any, reminderType: "24H" | "2H") {
  const alreadySent = await ReminderLogModel.findOne({
    eventId: event._id,
    reminderType,
  });

  if (alreadySent) {
    return;
  }

  const students = await StudentModel.find({
    eventId: event._id,
  });

  console.log(
    `${reminderType} reminder -> ${event.city} -> ${students.length} students`,
  );

  for (const student of students) {
    try {
      // Replace with your actual WhatsApp function

      console.log(`Sending ${reminderType} reminder to ${student.phone}`);

      /*
      await sendWhatsAppTemplate({
        phone: student.phone,
        fullname: student.fullname,
        city: event.city,
        venue: event.venue,
        startDateTime: event.startDateTime,
        reminderType,
      });
      */
    } catch (error) {
      console.error(`Failed for ${student.phone}`, error);
    }
  }

  await ReminderLogModel.create({
    eventId: event._id,
    reminderType,
  });
}

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get("x-cron-secret");

    if (auth !== process.env.HS_PSWD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const now = moment.utc();

    const events = await EventModel.find({});

    let remindersSent = 0;

    for (const event of events) {
      const eventTime = moment.utc(event.startDateTime);

      const hoursRemaining = eventTime.diff(now, "hours", true);

      // 24 Hour Reminder
      if (hoursRemaining <= 24 && hoursRemaining > 23.75) {
        await sendReminder(event, "24H");
        remindersSent++;
      }

      // 2 Hour Reminder
      if (hoursRemaining <= 2 && hoursRemaining > 1.75) {
        await sendReminder(event, "2H");
        remindersSent++;
      }
    }

    return NextResponse.json({
      success: true,
      remindersSent,
      checkedAt: new Date(),
    });
  } catch (error) {
    console.error("Cron job error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Reminder job failed",
      },
      { status: 500 },
    );
  }
}
