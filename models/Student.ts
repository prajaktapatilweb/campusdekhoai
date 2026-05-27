import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    phone: String,
    whatsapp: String,
    district: String,

    college: String,
    address: String,
    helpNeeded: String,
    education: String,
    targetStream: String,
    attendedSeminar: String,

    eventCity: String,

    reference: String,

    verified: {
      type: Boolean,
      default: false,
    },

    ipAddress: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
