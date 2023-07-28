import { ShowService } from '../service/show_service';
import { Request, Response } from 'express';

export class ShowController {
  showService = new ShowService();

  createPerformance = async (req: Request, res: Response) => {
    try {
      const { title, date, address } = req.body;
      if (!title) {
        return res.status(400).json({ errorMessage: 'title을 입력해 주세요' });
      }
      if (!date) {
        return res.status(400).json({ errorMessage: 'date을 입력해 주세요' });
      }
      if (!address) {
        return res
          .status(400)
          .json({ errorMessage: 'address을 입력해 주세요' });
      }

      const performance = await this.showService.createPerformance(
        title,
        date,
        address
      );
      res.status(201).json(performance);
    } catch (error) {
      console.error('show_controller_createPerformance()', error);
      res.status(401).json({ error: error });
    }
  };
}
