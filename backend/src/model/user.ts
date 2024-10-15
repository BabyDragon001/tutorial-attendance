import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password?: string;
  number?: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  identityNumber?: string;
  name?: string;
  familyName?: string;
  image?: string;
  role?: "user" | "admin";
  department?: string;
  level?: string;
  cummulativePoint?: number;
}

const options = { timestamps: true };

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    password: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    identityNumber: { type: String },
    name: { type: String },
    familyName: { type: String },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    department: { type: String },
    level: { type: String },
    cummulativePoint: { type: Number, default: 0 },
  },
  options
);

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified("otp") && this.otp) {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
  }
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
