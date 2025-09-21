import { Router } from 'express';

import { authGuard } from '../middlewares/auth.middleware';
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
} from '../controllers/reservation.controller';

const router = Router();

router.post('/', createReservation);

router.use(authGuard);

router.get('/', getReservations);
router.get('/:id', getReservationById);
router.patch('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;
