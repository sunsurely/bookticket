import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

export const authorizated = async (req: Request, res: Response, next: any) => {
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
    console.log('userState', process.env.COOKIE_SECRET);
    const { user_id } = jwt.verify(
      authToken,
      process.env.COOKIE_SECRET as string // env 파일의 COOKIE_SECRET를 정상적으로 불러오는지 확인 예정
    ) as JwtPayload;

    res.locals.user_id = user_id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: '잘못된 접근입니다.' });
  }
};

export const isLoggedIn = async (req: Request, res: Response, next: any) => {
  const { authorization } = req.cookies;

  if (!authorization) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  const { authType, authToken } = (authorization ?? '').split(' ');

  const { user } = jwt.verify(
    authToken,
    process.env.COOKIE_SECRET as string
  ) as JwtPayload;
  if (!authorization || authType !== 'Bearer' || !authToken) {
    res.locals.isLoggedIn = false;
    next();
    return;
  }

  res.locals.isLoggedIn = true;
  console.log(user);
  res.locals.user_id = user.user_id;
  res.locals.status = user.status;
  next();
};
