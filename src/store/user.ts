
import Actions from '../action/actions';
import { RECEIVE_USERDETAIL, SAVE_USERINFO } from '../constants';
import { Stores } from './index';

export type User = {
  userDetail: any;
  userinfo: any;
};

export const initState = {
  userDetail: {},
  userinfo: {},
};

export default function user ( state: User = initState,  action: Actions ): User {
  switch (action.type) {
    case RECEIVE_USERDETAIL:
      const { payload: { userDetail } } = action;

      return {
        ...state,
        userDetail,
      };

    case SAVE_USERINFO:
      const { payload: { userinfo } } = action;
      return {
        ...state,
        userinfo,
      }

    default: return state;
  }
}

export const getUserdetail = (state: Stores) => state.user.userDetail;

export const getUserinfo = (state: Stores) => state.user.userinfo;