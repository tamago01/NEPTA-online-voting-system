import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  hasVoted: boolean;
  membershipNumber: string;
  membershipValidityDate: string;
  phoneNumber: string;
  otp: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: { type: Boolean },
  password: { type: String, required: false },
  hasVoted: { type: Boolean, default: false },
  membershipNumber: { type: String, required: false },
  membershipValidityDate: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  otp: { type: String, required: false, default: "" },
});

export const User = mongoose.model<IUser>("User", UserSchema);
