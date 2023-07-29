import { ReservationService } from '../service/reservation_service';
import { Request, Response } from 'express';

export class ReservationController {
  reservationService = new ReservationService();

  createReservation = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const seat_id = parseInt(req.query.seat_id as string);
    const performance_id = parseInt(req.query.performance_id as string);

    try {
      if (!user.user_id) {
        return res
          .status(400)
          .json({ errorMessage: 'user_id를 수신받지 못했습니다' });
      }

      if (!seat_id) {
        return res
          .status(400)
          .json({ errorMessage: 'seat_id를 수신받지 못했습니다' });
      }

      const reservationData = await this.reservationService.createReservation(
        user.user_id,
        seat_id,
        performance_id
      );

      if (!reservationData) {
        return res
          .status(401)
          .json({ errorMessage: '좌석 예매에 실패했습니다' });
      }

      res.status(201).json(reservationData);
    } catch (error) {
      console.error('reservation_controller_createReservation()', error);
      res.status(401).json({ error: error });
    }
  };

  readReservation = async (req: Request, res: Response) => {
    const user_id = res.locals.user.user_id;
    const reservation_id = parseInt(req.query.reservation_id as string);

    try {
      if (!user_id) {
        return res
          .status(400)
          .json({ errorMessage: '아이디가 존재하지 않습니다.' });
      }

      const reservation = await this.reservationService.readReservation(
        reservation_id,
        user_id
      );

      if (!reservation) {
        return res
          .status(400)
          .json({ errorMessage: '예약내역이 존재하지 않습니다.' });
      }

      res.status(200).json(reservation);
    } catch (error) {
      console.error('reservation_controller_readReservation()', error);
      res.status(400).json({ error: error });
    }
  };

  deleteReservation = async (req: Request, res: Response) => {
    const seat_id = parseInt(req.query.seat_id as string);
    const reservation_id = parseInt(req.query.reservation_id as string);
    const user = res.locals.user;
    const user_id = user.user_id;
    try {
      if (!user_id) {
        return res
          .status(400)
          .json({ errorMessage: 'user_id를 수신받지 못했습니다' });
      }

      if (!seat_id) {
        return res
          .status(400)
          .json({ errorMessage: 'seat_id를 수신받지 못했습니다' });
      }

      if (!reservation_id) {
        return res
          .status(400)
          .json({ errorMessage: 'reservation_id를 수신받지 못했습니다' });
      }

      await this.reservationService.deleteReservation(
        reservation_id,
        user_id,
        seat_id
      );

      res.status(201).json({ message: '예약을 취소했습니다.' });
    } catch (error) {
      console.error('reservation_controller_deleteReservation()', error);
      res.status(400).json({ error: error });
    }
  };
}
