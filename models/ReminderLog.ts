import mongoose from "mongoose";

const ReminderLogSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["PROCESSING", "SENT", "FAILED"],
      default: "PROCESSING",
    },
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
    successCount: {
      type: Number,
      default: 0,
    },
    failCount: {
      type: Number,
      default: 0,
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
