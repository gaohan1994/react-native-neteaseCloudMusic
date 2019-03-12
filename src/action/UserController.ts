import { store } from '../App';
import { } from '../constants';
import UserService from '../service/UserService';
import { AbstractParams } from './actions';

class UserController {

  public login = async (params: AbstractParams<any>) => {
    const { param: { phone, password } } = params;
    const payload = `phone=${phone}&password=${password}`;

    const { code, account, profile } = await UserService.login(payload);

    if (code === 200) {
      console.log('account: ', account);
      console.log('profile: ', profile);
      
      return { success: true };
    } else {
      return { success: false };
    }
  }

  public refresh = async () => {

    const { code } = await UserService.refresh();

    console.log('code: ', code);
  }
}

export default new UserController();