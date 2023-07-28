import { ShowService } from '../service/show_service';
import { Request, Response } from 'express';

export class ShowController {
  showService = new ShowService();

  createPerformance = async (req: Request, res: Response) => {
    try {
      const { showMetadata, seatInfos, showTimes } = req.body;

      if (!showMetadata) {
        return res
          .status(401)
          .json({ errorMessage: '공연정보를 입력해주세요' });
      }
      if (!seatInfos) {
        return res
          .status(401)
          .json({ errorMessage: '좌석정보를 입력해주세요' });
      }
      if (!showTimes) {
        return res
          .status(401)
          .json({ errorMessage: '날짜정보를 입력해주세요' });
      }

      await this.showService.createPerformance(
        showMetadata,
        seatInfos,
        showTimes
      );

      res.status(201).json({ message: '공연등록이 완료되었습니다.' });
    } catch (error) {
      console.error('show_controller_createPerformance()', error);
      res.status(401).json({ error: error });
    }
  };
}
