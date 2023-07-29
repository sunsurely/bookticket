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

  readPerformance = async () => {
    try {
      const performanceAll = await this.showRepository.readPerformance();
      return performanceAll;
      if (!performanceAll) {
        throw { status: 400, errorMessage: '데이터가 존재하지 않습니다.' };
      }
    } catch (error) {
      console.error('show_service_readPerformance', error);
      throw error;
    }
  };

  readPerformanceDetail = async (performance_id: number) => {
    try {
      const performance = await this.showRepository.readPerformanceDetail(
        performance_id
      );

      if (!performance) {
        throw { status: 400, errorMessage: '데이터가 존재하지 않습니다.' };
      }

      return performance;
    } catch (error) {
      console.error('show_service_readPerformanceDetail()', error);
      throw error;
    }
  };

  readPerformanceByKeyword = async (keword: string) => {
    try {
      const performance = await this.showRepository.readPerformanceByKeyword(
        keword
      );

      if (!performance) {
        throw {
          status: 400,
          errorMessage: '키워드에 해당하는 데이터가 없습니다.',
        };
      }

      return performance;
    } catch (error) {
      console.error('show_service_readPerformanceByKeyword()', error);
      throw error;
    }
  };
}
