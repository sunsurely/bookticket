import express from 'express';
import { authorizated } from '../middleware/userState_middleware';
import { ShowController } from '../controllers/show_controller';

const showController = new ShowController();

const router = express.Router();

router.post('/show/register', authorizated, showController.createPerformance);

export default router;
