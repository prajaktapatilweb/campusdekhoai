import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import Student from "@/models/Student";
import UserModel from "@/models/User";
import EventModel from "@/models/Event";

import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(async (req, user) => {
  try {
    // const token = req.cookies.get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // jwt.verify
    // (token, process.env.JWT_SECRET!);
    console.log("Reached to GET", user);
    await connectDB();
    const loggedInUser = await UserModel.findById(user.id).select(
      "role allowedEvents",
    );
    if (!loggedInUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const now = new Date();

    // Get active events
    const activeEvents = await EventModel.find({
      endDateTime: { $gt: new Date().toISOString() },
    }).select("_id");

    const activeEventIds = activeEvents.map((e) => e._id);
    // console.log("Active event IDs:", activeEvents, activeEventIds);

    let studentFilter = {
      eventId: { $in: activeEventIds },
    };

    if (loggedInUser.role !== "admin") {
      studentFilter.eventId.$in = activeEventIds.filter((id) =>
        loggedInUser.allowedEvents.includes(id),
      );
    }
    // console.log("Student filter:", studentFilter);
    // let studentFilter = {};
    // if (loggedInUser.role !== "admin") {
    //   studentFilter = {
    //     eventId: {
    //       $in: loggedInUser.allowedEvents,
    //     },
    //   };
    // }
    // Student List
    const students = await Student.find(studentFilter).sort({
      createdAt: -1,
    });
    const eventCounts = await Student.aggregate([
      { $match: studentFilter },
      { $group: { _id: "$evenetLocation", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    console.log("Students fetched:", eventCounts);

    return NextResponse.json(
      {
        success: true,
        students,
        eventCounts,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
});
