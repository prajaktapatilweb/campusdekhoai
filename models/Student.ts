import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    whatsapp: { type: String },

    education: { type: String, required: true },
    targetStream: { type: String, required: true },
    attendingSeminar: { type: String, required: true },
    reference: { type: String, required: true },
    district: { type: String, required: true },

    // ✅ ARRAY FIELD
    helpNeeded: {
      type: [String], // 👈 important
      required: true,
      default: [],
    },

    evenetLocation: { type: String },

    phoneVerified: { type: Boolean, default: false },

    verified: { type: Boolean, default: false },

    ipAddress: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);
