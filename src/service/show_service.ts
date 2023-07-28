import { ShowRepository } from '../repositories/show_repository';

export class ShowService {
  showRepository = new ShowRepository();

  createPerformance = async (title: string, date: Date, address: string) => {
    try {
      const performance = await this.showRepository.createPerformance(
        title,
        date,
        address
      );
      if (!performance) {
        throw {
          status: 402,
          errorMessage: '공연 등록 실패',
        };
      }
      return performance;
    } catch (error) {
      console.error('show_service_createPerformance()', error);
      throw error;
    }
  };
}
