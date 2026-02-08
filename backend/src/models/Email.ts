// backend/src/models/Email.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEmail extends Document {
  to: string;
  subject: string;
  body: string;
  sentAt: Date;
  status?: string;
}

const EmailSchema: Schema<IEmail> = new Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, required: true },
    status: { type: String, default: "Scheduled" },
  },
  { timestamps: true }
);

const Email: Model<IEmail> = mongoose.models.Email || mongoose.model<IEmail>("Email", EmailSchema);

export default Email;
