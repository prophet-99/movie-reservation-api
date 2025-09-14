import { NextFunction, Request, Response } from 'express';
import { ReservationModel } from '../models/reservation.model';

export async function createReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservation = await ReservationModel.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
}
