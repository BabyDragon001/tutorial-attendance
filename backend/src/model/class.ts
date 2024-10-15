import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  description?: string;
  students: mongoose.Types.ObjectId[]; // Array of user IDs (students)
  qrCode?: string; // Store the QR code URL
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Reference to User model
    qrCode: { type: String }, // URL to the QR code
  },
  { timestamps: true }
);

const Class = mongoose.model<IClass>("Class", ClassSchema);
export default Class;
