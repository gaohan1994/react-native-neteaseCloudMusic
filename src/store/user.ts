
import Actions from '../action/actions';
import { RECEIVE_USERDETAIL } from '../constants';
import { Stores } from './index';

export type User = {
  userDetail: any;
};

export const initState = {
  userDetail: {}
};

export default function user ( state: User = initState,  action: Actions ): User {
  switch (action.type) {
    case RECEIVE_USERDETAIL:
      const { payload: { userDetail } } = action;

      return {
        ...state,
        userDetail,
      };

    default: return state;
  }
}

export const getUserdetail = (state: Stores) => state.user.userDetail;