import { genSaltSync, hashSync } from 'bcryptjs';
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true, trim: true, required: true },
  userId: { type: String },
  userName: { type: String, trim: true, },
  password: { type: String, required: true },
  avatar: { type: String, trim: true },
  ID: { type: String },
  deletedAt: { type: Date },
}, { timestamps: true, versionKey: false })

userSchema.pre('save', async function (next) {
  const user: any = this;
  if (user.isModified('password')) {
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
  }
  next();
});

model('User', userSchema)

