import { Router } from 'express';

import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from '../controllers/reservation.controller';

const router = Router();

router.get('/', getReservations);
router.post('/', createReservation);
router.get('/:id', getReservationById);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
