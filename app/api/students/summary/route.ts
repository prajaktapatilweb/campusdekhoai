import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import Student from "@/models/Student";

import { connectDB } from "@/lib/mongodb";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(async (req, user) => {
  try {
    // const token = req.cookies.get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Reached to GET", user);
    await connectDB();
    // Student List
    const students = await Student.find().sort({
      createdAt: -1,
    });
    const eventCounts = await Student.aggregate([
      {
        $group: {
          _id: "$evenetLocation",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
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
