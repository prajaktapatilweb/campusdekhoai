import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    regId: { type: String, required: true },
    whatsapp: { type: String },
    education: { type: String },
    targetStream: { type: String },
    attendingSeminar: { type: String },
    reference: { type: String },
    district: { type: String },

    // ✅ ARRAY FIELD
    helpNeeded: {
      type: [String], // 👈 important
      // required: true,
      default: [],
    },

    evenetLocation: { type: String },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    phoneVerified: { type: Boolean, default: false },

    verified: { type: Boolean, default: false },

    ipAddress: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

studentSchema.index({ eventId: 1 });
studentSchema.index({ createdAt: -1 });

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
