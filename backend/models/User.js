import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "email required"],
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: 6,
    },
    displayName: { type: String, trim: true, minlength: 4, default: "" },
    avatar: { type: String, default: "" },
    bio: { type: String, maxlength: 100, default: "" },
  },
  { timestamps: true }
);
export default model("User", UserSchema);
