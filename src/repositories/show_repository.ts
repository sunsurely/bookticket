import { Transaction } from 'sequelize';
import { Performance, Seat, sequelize } from '../models';
import { Op } from 'sequelize';

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
      attributes: ['title', 'date', 'address', 'performance_id'],
    });

    return performanceAll;
  };

  readPerformanceDetail = async (performance_id: number) => {
    const performance = await Performance.findOne({
      where: { performance_id },
      attributes: ['title', 'description', 'address', 'performance_id'],
      include: {
        model: Seat,
        attributes: ['seat_number', 'seat_grade', 'price'],
      },
    });

    return performance;
  };

  readPerformanceByKeyword = async (keyword: string) => {
    const performance = await Performance.findAll({
      attributes: ['performance_id', 'title', 'date', 'address'],
      include: {
        model: Seat,
        attributes: ['seat_number', 'seat_grade', 'price'],
      },
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });

    return performance;
  };
}
