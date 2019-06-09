import { CHANGE_LOGIN_STATUS } from '../constants';
// import { StatusActions } from '../action/StatusControll';
import { Stores } from './index';
import Actions from '../action/actions';

export type Status = {
  showLogin: boolean;
  loading: boolean;
};

export const initState = {
  showLogin: false,
  loading: false,
};

/**
 * status 仓库
 *
 * @export
 * @param {Status} [state=initState]
 * @param {*} action
 * @returns {Status}
 */
export default function status ( state: Status = initState,  action: Actions ): Status {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      const { payload: { showLogin } } = action;
      return {
        ...state,
        showLogin,
      }

    default: return state;
  }
}

export const GetLoginStatus = (state: Stores) => state.status.showLogin;