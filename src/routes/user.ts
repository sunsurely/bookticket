import express from 'express';
import { authorizated } from '../middleware/userState_middleware';
import { UserController } from '../controllers/user_controller';

const userController = new UserController();

const router = express.Router();

router.post('/signup', userController.createUser);

router.get('/profiles', authorizated, userController.readProfile);

export default router;
