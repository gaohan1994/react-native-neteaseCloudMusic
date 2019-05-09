import { store } from '../App';
import { RECEIVE_USERDETAIL, SAVE_USERINFO } from '../constants';
import UserService from '../service/UserService';
import { AbstractParams } from './actions';

class UserController {

  public captchRegister = async (params: any) => {
    const { code } = await UserService.captchRegister(params);

    console.log('code: ', code);
  }

  public loginCellphone = async (params: any) => {
    const result = await UserService.loginCellphone(params);

    if (result.code === 200) {

      store.dispatch({
        type: RECEIVE_USERDETAIL,
        payload: { userDetail: result },
      });

      return { success: true, result };
    } else {
      return { success: false, result: '登录失败' };
    }
  }
  
  public userAdd = async (params: any) => {
    const { code, msg } = await UserService.userAdd(params);

    if (code !== 0) {
      return { success: false, result: msg };
    } else {
      return { success: true, result: '' };
    }
  }
  
  public checkLoginNameUnique = async (params: any) => {
    const {  } = await UserService.checkLoginNameUnique(params);
  }

  public userEdit = async (params: any) => {
    const {  } = await UserService.userEdit(params);
  }

  public resetPwd = async (params: any) => {
    const {  } = await UserService.resetPwd(params);
  }

  public login = async (params: any) => {
    const { code, msg } = await UserService.login(params);

    if (code === 0) {
      store.dispatch({
        type: SAVE_USERINFO,
        payload: {
          userinfo: params
        }
      });
      return { success: true, result: msg };
    } else {
      return { success: false, result: msg };
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