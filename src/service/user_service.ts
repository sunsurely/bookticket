import { UserRepository } from '../repositories/user_repository';
import bcrypt from 'bcrypt';

export class UserService {
  userRepository = new UserRepository();

  createUser = async (
    email: string,
    nickname: string,
    call: string,
    password: string,
    confirm: string
  ) => {
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{3,}$/;

    try {
      if (!nickname || !pattern.test(nickname)) {
        throw {
          status: 412,
          errorMessage: '닉네임의 형식이 일치하지 않습니다.',
        };
      }

      if (password.length < 4 || password.includes(nickname)) {
        throw {
          status: 412,
          errorMessage: '비밀번호의 형식이 일치하지 않습니다.',
        };
      }
      if (password !== confirm) {
        throw {
          status: 412,
          errorMessage: '패스워드가 패스워드 확인과 다릅니다.',
        };
      }

      const user = await this.userRepository.findUser(email);

      if (user) {
        throw { status: 412, errorMessage: '이미 존재하는 이용자입니다.' };
      }
      const hash = await bcrypt.hash(password, 12);

      await this.userRepository.createUser(email, nickname, call, hash);

      return;
    } catch (error) {
      console.error('user_service', error);
      throw { status: 412, errorMessage: '회원가입에 실패했습니다.' };
    }
  };

  readProfile = async (user_id: number) => {
    try {
      const profile = await this.userRepository.readProfile(user_id);
      if (!profile) {
        throw { error: '자료 조회 실패' };
      }
      return profile;
    } catch (error) {
      console.error('user_service_readProfile()', error);
      throw error;
    }
  };
}
