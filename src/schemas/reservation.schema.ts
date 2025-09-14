import { Schema } from 'mongoose';

export const reservationSchema = new Schema(
  {
    reservationDate: { type: String, required: true },
    reservationHour: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: 0, max: 100 },
    address: { type: String, required: true },
    email: { type: String, required: true },
    ticketNumber: { type: Number, required: true, min: 1, max: 4 },
  },
  {
    timestamps: true,
  }
);
