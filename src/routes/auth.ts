import express from 'express';
import { isLoggedIn } from '../middleware/userState_middleware';
import {
  loginController,
  kakaoAuth,
  kakaoCallback,
  logoutController,
} from '../controllers/auth_controller';

const router = express.Router();

router.post('/login', isLoggedIn, loginController);

router.post('/kakao', isLoggedIn, kakaoAuth);

router.post('/kakao/callback', kakaoCallback);

router.post('/logout', logoutController);

export default router;
