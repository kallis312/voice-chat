import { Schema, model } from "mongoose";

const addressBookSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Number, default: 0 },
  deletedAt: { type: Date },
  // block: { type: Boo }
}, { timestamps: true, versionKey: false })

model('AddressBook', addressBookSchema)

