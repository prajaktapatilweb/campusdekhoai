import { NextResponse, NextRequest } from "next/server";
import moment from "moment";

import { connectDB } from "@/lib/mongodb";

import EventModel from "@/models/Event";
import StudentModel from "@/models/Student";
import ReminderLogModel from "@/models/ReminderLog";
import { sendReminderViaCM } from "@/lib/Whatsapp/reminder";
import { EVENT_LOCATION } from "@/components/constants/eventWhatsappGroups";

// import your whatsapp function
// import { sendWhatsAppTemplate } from "@/lib/whatsapp";

async function sendReminder(event: any, reminderType: "24H" | "2H") {
  const lock = await ReminderLogModel.findOneAndUpdate(
    { eventId: event._id, reminderType, status: { $ne: "SENT" } },
    {
      $set: { status: "PROCESSING" },
      $setOnInsert: { eventId: event._id, reminderType, sentAt: new Date() },
    },
    { upsert: true, new: false },
  );

  if (lock?.status === "SENT") {
    console.log(`${reminderType} already sent`);
    return false;
  }

  if (
    lock?.status === "PROCESSING" &&
    moment().diff(lock.updatedAt, "minutes") < 30
  ) {
    console.log(`${reminderType} currently processing`);
    return false;
  }

  const students = await StudentModel.find({ eventId: event._id });

  console.log(
    `${reminderType} reminder -> ${event.city} -> ${students.length} students`,
  );

  const templateName =
    reminderType === "24H"
      ? "before_24h_20260602155616"
      : // : "reminder_2h_before_20260602160044";
        "reminder_2h_before_cta_20260606124700";
  const startTime = event
    ? moment(event.startDateTime).utcOffset("+05:30")
    : null;
  const endTime = event ? moment(event.endDateTime).utcOffset("+05:30") : null;
  const dayDate = startTime ? startTime.format("dddd, DD MMMM YYYY") : "";
  const time =
    startTime && endTime
      ? `${startTime.format("h:mm A")} to ${endTime.format("h:mm A")}`
      : "-";

  const batchSize = 20;
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < students.length; i += batchSize) {
    const batch = students.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map((student) =>
        sendReminderViaCM({
          phone: student.phone,
          name: student.fullname,
          city: String(event.city),
          venue: String(event.venue),
          dayDate: String(dayDate),
          time: String(time),
          templateName,
          locationUrl: EVENT_LOCATION[event.city] || "",
        }),
      ),
    );
    successCount += batchResults.filter((r) => r.success).length;
    failCount += batchResults.filter((r) => !r.success).length;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`${reminderType}: Success=${successCount} Failed=${failCount}`);
  await ReminderLogModel.updateOne(
    { eventId: event._id, reminderType },
    {
      $set: {
        status: successCount > 0 ? "SENT" : "FAILED",
        successCount,
        failCount,
        sentAt: new Date(),
      },
    },
  );
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
      console.log(`Checking event ${event.city} at ${eventTime.format()}`);
      console.log(`Hours remaining: ${hoursRemaining.toFixed(2)}`);
      // 24 Hour Reminder
      if (hoursRemaining <= 24 && hoursRemaining > 23) {
        await sendReminder(event, "24H");
        remindersSent++;
      }

      // 2 Hour Reminder
      if (hoursRemaining <= 2.5 && hoursRemaining > 1.5) {
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
