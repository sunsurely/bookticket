const passport = require('passport');
import jwt, { Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from 'models';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '이미 로그인 중입니다.' });
    }
    passport.authenticate(
      'local',
      (passportError: Error, user: User | false, info: any) => {
        if (passportError || !user) {
          return res.status(400).json({ reason: info });
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            return res.status(400).json({ errorMessage: loginError });
          }
          const token = jwt.sign(
            { user: user },
            process.env.COOKIE_SECRET as Secret
          );

          res.cookie('authorization', `Bearer ${token}`);
          return res.status(200).json({ message: '로그인 되었습니다.' });
        });
      }
    )(req, res, next);
  } catch (error) {
    console.error('auth_controller', error);
    next(error);
  }
};

export const logoutController = (req: Request, res: Response) => {
  try {
    if (!res.locals.isLoggedIn) {
      return res.status(400).json({ errorMessage: '로그인 상태가 아닙니다' });
    }

    res.clearCookie('authorization');
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
};

export const kakaoAuth = () => {
  passport.authenticate('kakao');
};

export const kakaoCallback = (req: Request, res: Response) => {
  passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패',
  });

  res.redirect('/');
};
