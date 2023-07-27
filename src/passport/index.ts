const passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as KakaoStrategy, StrategyOption } from 'passport-kakao';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import { User } from '../models';

const localConfig = { usernameField: 'account', passwordField: 'password' };

const kakaoConfig: StrategyOption = {
  clientID: process.env.KAKAO_CLIENT_ID || '',
  callbackURL: 'auth/kakao/callback',
};

const localVerify = async (email: string, password: string, done: any) => {
  try {
    if (!email) {
      done(null, false, { message: '이메일을 입력해주세요' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }
    if (!password) {
      done(null, false, { message: '비밀번호를 입력해주세요.' });
      return;
    }
    const compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      done(null, user);
      return;
    }
    done(null, false, { message: '올바르지 않은 비밀번호입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

const KakaoVerify = async (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) => {
  console.log('kakao profile', profile);
  try {
    const exUser = await User.findOne({
      where: { sns_id: profile.id, provider: 'kakao' },
    });
    if (exUser) {
      done(null, exUser);
    } else {
      const newUser = await User.create({
        email: profile._json?.kakao_account?.account,
        nickname: profile.displayName,
        sns_id: profile.id,
        provider: 'kakao',
      });
      done(null, newUser);
    }
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(localConfig, localVerify));
  passport.use('kakao', new KakaoStrategy(kakaoConfig, KakaoVerify));
};
