import { Transaction } from 'sequelize';
import { sequelize } from '../models';
import { ReservationRepository } from '../repositories/reservation_repository';

export class ReservationService {
  reservationRepository = new ReservationRepository();

  createReservation = async (
    user_id: number,
    seat_id: number,
    performance_id: number
  ) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const result = await this.reservationRepository.readSeatReserved(seat_id);

      if (!result) {
        throw { status: 400, errorMessage: '좌석정보가 존재하지 않습니다.' };
      }
      if (result.reserved) {
        throw { status: 400, errorMessage: '해당 좌석은 매진되었습니다.' };
      }

      const createReservation =
        await this.reservationRepository.createReservation(
          user_id,
          seat_id,
          performance_id,
          t
        );

      const seatReservation =
        await this.reservationRepository.updateSeatReservation(seat_id, t);

      const point = (result.price as number) * -1;
      const pointReseult = await this.reservationRepository.updateUserPoint(
        user_id,
        point,
        t
      );

      await t.commit();

      return { createReservation, seatReservation };
    } catch (error) {
      console.error('reservation_service_createReservation', error);
      await t.rollback();
      throw error;
    }
  };

  readReservation = async (reservation_id: number, user_id: number) => {
    try {
      const reservation = await this.reservationRepository.readReservation(
        reservation_id,
        user_id
      );

      if (!reservation) {
        throw { status: 400, errorMessage: '예약내역이 존재하지 않습니다.' };
      }

      return reservation;
    } catch (error) {
      console.error('reservation_service_readReservation()', error);
      throw error;
    }
  };

  deleteReservation = async (
    reservation_id: number,
    user_id: number,
    seat_id: number
  ) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      const { price } = await this.reservationRepository.readSeatReserved(
        seat_id
      );

      const existReservation = await this.reservationRepository.readReservation(
        reservation_id,
        user_id
      );

      if (!existReservation) {
        throw { status: 400, errorMessage: '예약내역이 존재하지 않습니다' };
      }

      await this.reservationRepository.deleteReservation(
        reservation_id,
        user_id,
        t
      );

      await this.reservationRepository.updateSeatReservation(seat_id, t);

      const point = price as number;
      await this.reservationRepository.updateUserPoint(user_id, point, t);

      t.commit();
    } catch (error) {
      console.error('reservation_service_deleteReservation()', error);
      t.rollback();
      throw error;
    }
  };
}
