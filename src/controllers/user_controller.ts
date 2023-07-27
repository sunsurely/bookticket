import { UserService } from '../service/user_service';
import { Response, Request } from 'express';

export class UserController {
  userService = new UserService();
  createUser = async (req: Request, res: Response) => {
    try {
      const { email, nickname, call, password, confirm } = req.body;
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
        res
      );
    } catch (error) {
      console.log('user_controller쪽', error);
      res.status(400).json({ error: error });
    }
  };
}
