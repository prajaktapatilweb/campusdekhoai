import Counter from "@/models/Counter";

export async function generateSeqId(fieldName, idInitials) {
  let counter = await Counter.findOneAndUpdate(
    { modelName: fieldName },
    { $inc: { count: 1 } }, // Increment the sequence
    { new: true, upsert: true, setDefaultsOnInsert: true }, // Create if not exists
  );
  // If findOneAndUpdate didn't return a document, create one manually
  if (!counter) {
    console.log("Counter document not found, creating a new one.");
    counter = await Counter.create({ modelName: fieldName, count: 1 });
  }
  return `${idInitials}-${counter.count + 101}`;
}
