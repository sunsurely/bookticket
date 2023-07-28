import { Transaction } from 'sequelize';
import { sequelize } from '../models';

import { ShowRepository } from '../repositories/show_repository';

type Meta = {
  title: string;
  description: string;
  address: string;
};

type SeatInfo = {
  seat_number: number;
  seat_grade: string;
  price: number;
};

export class ShowService {
  showRepository = new ShowRepository();

  createPerformance = async (
    showMetadata: Meta,
    seatInfos: Array<SeatInfo>,
    showTimes: Array<string>
  ) => {
    const t = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });
    try {
      for (let i = 0; i < showTimes.length; i++) {
        const show = await this.showRepository.createPerformance(
          showMetadata.title,
          showMetadata.description,
          showTimes[i],
          showMetadata.address,
          t
        );

        for (let j = 0; j < seatInfos.length; j++) {
          const seat = seatInfos[j];
          await this.showRepository.createSeat(
            seat.seat_number,
            seat.seat_grade,
            seat.price,
            show.performance_id,
            t
          );
        }
      }

      t.commit();
    } catch (error) {
      console.error(error);
      t.rollback();
      throw error;
    }
  };
}
