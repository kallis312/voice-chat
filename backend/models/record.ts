import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  to: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Number, default: 0 },
  deletedAt: { type: Date },
  // block: { type: Boo }
}, { timestamps: true, versionKey: false })

model('Record', recordSchema)

