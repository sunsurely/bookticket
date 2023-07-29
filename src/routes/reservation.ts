import express from 'express';

import { ReservationController } from '../controllers/reservation_controller';
import { authorizated } from '../middleware/userState_middleware';

const router = express.Router();

const reservationController = new ReservationController();

router.post(
  '/reservations',
  authorizated,
  reservationController.createReservation
);

router.get(
  '/reservations',
  authorizated,
  reservationController.readReservation
);

router.delete(
  '/reservations',
  authorizated,
  reservationController.deleteReservation
);

export default router;
