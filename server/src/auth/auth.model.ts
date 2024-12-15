import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  hasVoted: boolean;
  membershipNumber:string;
  membershipValidityDate:string;
  phoneNumber:string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  hasVoted: { type: Boolean, default: false },
  membershipNumber:{type:String,required:true},
  membershipValidityDate:{type:String,required:true},
  phoneNumber:{type:String,required:false}
});

export const User = mongoose.model<IUser>("User", UserSchema);
