import mongoose from "mongoose";

const { Schema } = mongoose;

// const userOtpSchema = new Schema({
//   otp: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
//   email: { type: String, required: true, unique: true, maxlength: 255 },
// });

const usersSchema = new Schema({
  name: { type: String, maxlength: 255 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  number: { type: String, required: true, unique: true, maxlength: 50 },
});
export const UsersModel = mongoose.model("Users", usersSchema);
