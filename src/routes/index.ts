import express from 'express';

const router = express.Router();

import userRouter from './user';
import authRouter from './auth';
import showRouter from './performance';
import reservationRouter from './reservation';

const defaultRoutes = [
  {
    path: '/',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/',
    route: showRouter,
  },
  {
    path: '/',
    route: reservationRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
