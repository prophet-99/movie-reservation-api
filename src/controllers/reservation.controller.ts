import { NextFunction, Request, Response } from 'express';

import { ReservationModel } from '../models/reservation.model';
import { getErrorByCodeName } from '../utils/errors.util';

const NOT_FOUND_MESSAGE = 'Reserva no encontrada! ☹';
const NOT_FOUND_CUSTOM_ERROR = {
  CastError: NOT_FOUND_MESSAGE,
};

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

export async function getReservations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservations = await ReservationModel.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
}

export async function getReservationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservation = await ReservationModel.findById(req.params.id).lean();
    if (reservation) {
      res.json(reservation);
      return; // EARLY RETURN
    }

    res.status(404).json({ message: NOT_FOUND_MESSAGE });
  } catch (error: any) {
    const { message, status } = getErrorByCodeName(
      error?.name,
      NOT_FOUND_CUSTOM_ERROR
    );

    res.status(status).json({ message });
  }
}

export async function updateReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservationUpdated = await ReservationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).lean();
    if (reservationUpdated) {
      res.json(reservationUpdated);
      return; // EARLY RETURN
    }

    res.status(404).json({ message: NOT_FOUND_MESSAGE });
  } catch (error: any) {
    const { message, status } = getErrorByCodeName(
      error?.name,
      NOT_FOUND_CUSTOM_ERROR
    );

    res.status(status).json({ message });
  }
}

export async function deleteReservation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reservationDeleted = await ReservationModel.findByIdAndDelete(
      req.params.id
    ).lean();
    if (reservationDeleted) {
      res.status(204).json(reservationDeleted);
      return; // EARLY RETURN
    }

    res.status(404).json({ message: NOT_FOUND_MESSAGE });
  } catch (error: any) {
    const { message, status } = getErrorByCodeName(
      error?.name,
      NOT_FOUND_CUSTOM_ERROR
    );

    res.status(status).json({ message });
  }
}
