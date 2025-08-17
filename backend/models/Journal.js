import { Schema, model } from "mongoose";
const JournalSchema = new Schema(
  {
    title: { type: String, default: "", trim: true },
    content: { type: String, required: [true, "content is required"] },
    photos: { type: String },
    location: { type: String, default: "", trim: true },
    author: { type: Schema.types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export default model("Journal", JournalSchema);
