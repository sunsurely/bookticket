import { Transaction } from 'sequelize';
import { Performance, Seat } from '../models';

export class ShowRepository {
  createPerformance = async (
    title: string,
    description: string,
    date: string,
    address: string,
    t: Transaction
  ) => {
    const performance = await Performance.create(
      {
        title,
        description,
        date,
        address,
      },
      { transaction: t }
    );

    return performance;
  };

  createSeat = async (
    seat_number: number,
    seat_grade: string,
    price: number,
    performance_id: number,
    t: Transaction
  ) => {
    const seat = await Seat.create(
      {
        seat_number,
        seat_grade,
        price,
        performance_id,
      },
      { transaction: t }
    );
  };

  readPerformance = async () => {
    const performanceAll = await Performance.findAll({
      attributes: ['title', 'date', 'address', ''],
    });

    return performanceAll;
  };
}
