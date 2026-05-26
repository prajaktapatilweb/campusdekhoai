import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
    },
    cityMarathi: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },
    venueMarathi: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: String,
      required: true,
    },
    endDateTime: {
      type: String,
      required: true,
    },
    maxAttendees: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
