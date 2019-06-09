import { store } from '../App';
import { RECEIVE_USERDETAIL, SAVE_USERINFO } from '../constants';
import UserService from '../service/UserService';
import { AbstractParams } from './actions';
import StatusControll from './StatusControll';

class UserController {

  public register = async (params: any) => {
    await UserService.register(params);
  }

  public captchSent = async (params: any) => {
    const result = await UserService.captchSent(params);
    if (result.code === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  public logout = () => {

    store.dispatch({
      type: RECEIVE_USERDETAIL,
      payload: { 
        userDetail: {}
      }
    })
    return UserService.logout();
  }

  public auth = async (): Promise<any> => {

    const { user: { userDetail } } = await store.getState();

    if (userDetail.profile) {
      return new Promise((resolve, reject) => {
        resolve({userDetail});
      });
    } else {
      const showParams = { dispatch: store.dispatch, showLogin: true }
      StatusControll.changeLoginModal(showParams);
    }
  }

  public captchRegister = async (params: any) => {
    const result = await UserService.captchRegister(params);

    if (result.code === 200) {
      return { success: true, result };
    } else {
      return { success: false, result: result.message };
    }
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