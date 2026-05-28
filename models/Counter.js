import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  modelName: { type: String, required: true, unique: true }, // Model name (e.g., "User")
  count: { type: Number, required: true, default: 0 }, // Counter value
});

// Export or create the Counter model
export default mongoose.models.Counter ||
  mongoose.model("Counter", counterSchema);
