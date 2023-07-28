import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const authorizated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    return res.status(403).json({ errorMessage: '권한이 존재하지 않습니다.' });
  }
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (authType !== 'Bearer' || !authToken) {
    return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
  }
  process.env.COOKIE_SECRET;
  try {
    const { user } = jwt.verify(
      authToken,
      process.env.COOKIE_SECRET as Secret
    ) as JwtPayload;

    res.locals.user_id = user.user_id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  const { authType, authToken } = (authorization ?? '').split(' ');

  if (!authorization || authType !== 'Bearer' || !authToken) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }
  const { user } = jwt.verify(
    authToken,
    process.env.COOKIE_SECRET as string
  ) as JwtPayload;

  res.locals.isLoggedIn = true;
  console.log(user);
  res.locals.user_id = user.user_id;
  res.locals.status = user.status;
  next();
};
