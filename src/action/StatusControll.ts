import { CHANGE_LOGIN_STATUS } from '../constants';
// import { DispatchAbstract } from './actions';

class StatusController {

  public changeLoginModal = (params: any) => {
    const { dispatch, showLogin } = params;

    dispatch({
      type: CHANGE_LOGIN_STATUS,
      payload: { showLogin }
    });
  }
}

export default new StatusController();