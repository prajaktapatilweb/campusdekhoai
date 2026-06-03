import mongoose from "mongoose";

const ReminderLogSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    reminderType: {
      type: String,
      enum: ["24H", "2H"],
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

ReminderLogSchema.index({ eventId: 1, reminderType: 1 }, { unique: true });

export default mongoose.models.ReminderLog ||
  mongoose.model("ReminderLog", ReminderLogSchema);
