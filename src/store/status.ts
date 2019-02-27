// import { } from '../constants';
// import { StatusActions } from '../action/StatusControll';
// import { Stores } from './index';
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

    default: return state;
  }
}