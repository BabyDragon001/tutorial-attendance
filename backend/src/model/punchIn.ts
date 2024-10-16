import mongoose, { Schema, Document } from "mongoose";

export interface IPunchIn extends Document {
  userId: mongoose.Types.ObjectId;
  specialCode: string;
  time: Date;
}

const PunchInSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialCode: { type: String, required: true },
  time: { type: Date, default: Date.now, index: { expires: "2h" } },
});

const PunchIn = mongoose.model<IPunchIn>("PunchIn", PunchInSchema);

export default PunchIn;
