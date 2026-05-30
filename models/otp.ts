import mongoose, { Schema, models, model } from "mongoose";

const OtpSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      default: "Event Registration",
      enum: ["Event Registration", "College Predictor"],
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
  },
);

export default models.Otp || model("Otp", OtpSchema);
