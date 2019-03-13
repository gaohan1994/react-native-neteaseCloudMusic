import { store } from '../App';
import { RECEIVE_USERDETAIL } from '../constants';
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

  public userDeatail = async (params: AbstractParams<any>) => {
    const { param: { uid } } = params;
    const payload = `uid=${uid}`;

    const result = await UserService.userDeatail(payload);

    if (result.code === 200) {
      store.dispatch({
        type: RECEIVE_USERDETAIL,
        payload: {
          userDetail: result
        }
      });
      return { success: true, result };
    } else {
      return { success: false };
    }
  }
}

export default new UserController();