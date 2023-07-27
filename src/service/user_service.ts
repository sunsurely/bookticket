import { UserRepository } from '../repositories/user_repository';
import { Response } from 'express';
import bcrypt from 'bcrypt';

export class UserService {
  userRepository = new UserRepository();

  createUser = async (
    email: string,
    nickname: string,
    call: string,
    password: string,
    confirm: string,
    res: Response
  ) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{3,}$/;

    try {
      if (!nickname || !pattern.test(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: '닉네임의 형식이 일치하지 않습니다.' });
      }

      if (password.length < 4 || password.includes(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: '비밀번호의 형식이 일치하지 않습니다.' });
      }
      if (password !== confirm) {
        return res
          .status(412)
          .json({ errorMessage: '패스워드가 패스워드 확인과 다릅니다.' });
      }

      const user = await this.userRepository.findUser(email);

      if (user) {
        return res
          .status(412)
          .json({ errorMessage: '이미 존재하는 이용자입니다.' });
      }
      const hash = await bcrypt.hash(password, 12);

      await this.userRepository.createUser(email, nickname, call, hash);

      return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
      console.error('user_service', error);
      res.status(401).json({ error: error });
    }
  };
}
