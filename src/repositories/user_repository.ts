import User from '../models/user';

export class UserRepository {
  createUser = async (
    email: string,
    nickname: string,
    call: string,
    hash: string
  ) => {
    await User.create({
      email,
      nickname,
      call,
      password: hash,
    });
  };

  readProfile = async (user_id: number) => {
    const profile = await User.findOne({
      attributes: ['email', 'nickname', 'call', 'point'],
      where: { user_id },
    });

    return profile;
  };

  findUser = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    return user;
  };
}
