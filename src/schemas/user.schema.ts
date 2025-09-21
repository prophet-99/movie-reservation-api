import { Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
