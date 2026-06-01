// lib/getEvents.ts

import { connectDB } from "@/lib/mongodb";
import EventModel from "@/models/Event";

export async function getEvents() {
  await connectDB();

  const events = await EventModel.find({}).sort({ startDateTime: 1 }).lean();

  return JSON.parse(JSON.stringify(events));
}
