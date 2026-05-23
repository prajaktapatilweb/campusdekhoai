import mongoose, { Schema, models, model } from "mongoose";

const OtpSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    cooldownUntil: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Otp || model("Otp", OtpSchema);