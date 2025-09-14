import { model } from 'mongoose';

import { reservationSchema } from '../schemas/reservation.schema';

export type ReservationDoc = {
  _id: string;
  reservationDate: string;
  reservationHour: string;
  name: string;
  lastName: string;
  age: number;
  address: string;
  email: string;
  ticketNumber: number;
  createdAt: Date;
  updatedAt: Date;
};

export const ReservationModel = model<ReservationDoc>(
  'Reservation',
  reservationSchema
);
