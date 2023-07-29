import { Sequelize } from 'sequelize';
import { Reservation, Seat, User, Performance } from '../models/';
import { Transaction } from 'sequelize';

export class ReservationRepository {
  createReservation = async (
    user_id: number,
    seat_id: number,
    performance_id: number,
    t: Transaction
  ) => {
    const reservation = await Reservation.create(
      {
        seat_id,
        user_id,
        performance_id,
      },
      { transaction: t }
    );

    return reservation;
  };
  readReservation = async (reservation_id: number, user_id: number) => {
    const reservation = await Reservation.findOne({
      where: { user_id, reservation_id },
      attributes: ['reservation_id'],
      include: [
        {
          model: Seat,
          attributes: ['seat_number', 'seat_grade', 'price'],
        },
        {
          model: Performance,
          attributes: ['title', 'address', 'description'],
        },
      ],
    });

    return reservation;
  };

  deleteReservation = async (
    reservation_id: number,
    user_id: number,
    t: Transaction
  ) => {
    const deleted = await Reservation.destroy({
      where: { reservation_id, user_id },
      transaction: t,
    });
    return deleted;
  };

  readSeatReserved = async (seat_id: number) => {
    const seat = await Seat.findOne({
      attributes: ['reserved', 'price'],
      where: { seat_id },
    });

    const reserved = seat?.dataValues.reserved;
    const price = seat?.dataValues.price;
    return { reserved, price };
  };

  updateSeatReservation = async (seat_id: number, t: Transaction) => {
    const reserved = { reserved: Sequelize.literal('Not reserved') };
    await Seat.update(reserved, { where: { seat_id }, transaction: t });
  };

  updateUserPoint = async (user_id: number, point: number, t: Transaction) => {
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user) {
      const updatedPoint = user.point + point;
      await user.update({ point: updatedPoint }, { transaction: t });
    }
  };
}
