import { UserService } from '../service/user_service';
import { Response, Request } from 'express';

export class UserController {
  userService = new UserService();
  createUser = async (req: Request, res: Response) => {
    try {
      const { email, nickname, call, password, confirm, status } = req.body;
      if (!email) {
        return res
          .status(400)
          .json({ errorMessage: 'email 입력은 필수입니다.' });
      }
      if (!nickname) {
        return res.status(400).json({
          errorMessage: 'nickname은 필수 입력사항입니다.',
        });
      }
      if (!call) {
        return res.status(400).json({
          errorMessage: 'call은 필수 입력사항입니다.',
        });
      }
      if (!password) {
        return res.status(400).json({
          errorMessage: 'password값은 필수 입력사항입니다.',
        });
      }
      if (!confirm) {
        return res.status(400).json({
          errorMessage: 'password 확인을 해주세요',
        });
      }

      await this.userService.createUser(
        email,
        nickname,
        call,
        password,
        confirm,
        status
      );

      return res.status(201).json({ message: '회원가입에 성공했습니다.' });
    } catch (error) {
      console.log('user_controller_createUser()', error);
      res.status(400).json({ error: error });
    }
  };

  readProfile = async (req: Request, res: Response) => {
    try {
      const user_id = res.locals.user.user_id;
      if (!user_id) {
        return res
          .status(400)
          .json({ errorMessage: 'user_id가 정상적으로 수신되지 않았습니다.' });
      }

      const profile = await this.userService.readProfile(user_id);

      return res.status(200).json({ profile });
    } catch (error) {
      console.error('user_controller_readProfile()', error);
      return res.status(400).json({ error: error });
    }
  };
}
