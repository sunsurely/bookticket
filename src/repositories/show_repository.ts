import { Performance } from '../models';

export class ShowRepository {
  createPerformance = async (title: string, date: Date, address: string) => {
    const performance = await Performance.create({
      title,
      date,
      address,
    });

    return performance;
  };
}
