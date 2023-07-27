import express from 'express';

const router = express.Router();

import userRouter from './user';

const defaultRoutes = [
  {
    path: '/',
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
