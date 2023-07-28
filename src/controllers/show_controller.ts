import { performance } from 'perf_hooks';
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

  readPerformance = async (req: Request, res: Response) => {
    try {
      const performanceAll = await this.showService.readPerformance();
      if (!performanceAll) {
        return res
          .status(400)
          .json({ errorMessage: '데이터가 존재하지 않습니다.' });
      }

      return res.status(200).json(performanceAll);
    } catch (error) {
      console.error('show_controller_readPerformanceAll()', error);
      res.status(400).json({ error: error });
    }
  };

  readPerformanceDetail = async (req: Request, res: Response) => {
    try {
      const performance_id = parseInt(req.query.performance_id as string);

      if (!performance_id) {
        return res
          .status(400)
          .json({ errorMessage: 'performance_id를 수신받지 못했습니다.' });
      }
      const performance = await this.showService.readPerformanceDetail(
        performance_id
      );
      console.log(performance);
      if (!performance) {
        return res
          .status(400)
          .json({ errorMessage: '데이터가 존재하지 않습니다.' });
      }
      res.status(200).json(performance);
    } catch (error) {
      console.error('show_controller_readPerformanceDetail()', error);
      res.status(400).json({ error: error });
    }
  };

  readPerformanceByKeyword = async (req: Request, res: Response) => {
    const { keyword } = req.body;

    try {
      if (!keyword) {
        return res.status(400).json({ message: '수신된 키워드가 없습니다.' });
      }
      const performance = await this.showService.readPerformanceByKeyword(
        keyword
      );
      if (!performance) {
        return res
          .status(400)
          .json({ message: '키워드에 해당하는 데이터가 없습니다.' });
      }
      res.status(200).json(performance);
    } catch (error) {
      console.error('show_controller_readPerformanceByKewword()', error);
    }
  };
}
