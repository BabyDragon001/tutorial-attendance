import mongoose, { Schema, Document } from "mongoose";

export interface IClass extends Document {
  name: string;
  description?: string;
  students: mongoose.Types.ObjectId[];
  qrCode?: string;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    qrCode: { type: String },
  },
  { timestamps: true }
);

const Class = mongoose.model<IClass>("Class", ClassSchema);
export default Class;
