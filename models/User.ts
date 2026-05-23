import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "college"],
      default: "college",
    },
    collegeName: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
