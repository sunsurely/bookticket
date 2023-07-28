import express from 'express';
import { authorizated } from '../middleware/userState_middleware';
import { ShowController } from '../controllers/show_controller';

const showController = new ShowController();

const router = express.Router();

router.post('/shows/register', authorizated, showController.createPerformance);

router.get('/shows', showController.readPerformance);

router.get('/shows/detail', showController.readPerformanceDetail);

router.get('/shows/keyword', showController.readPerformanceByKeyword);

export default router;
