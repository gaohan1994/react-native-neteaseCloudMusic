import { RECEIVE_SEARCH_HOT } from '../constants';
import { Stores } from './index';
import Actions from '../action/actions';

export type Search = {
  hots: any[];
};

export const initState = {
  hots: [],
};

export default function status ( state: Search = initState,  action: Actions ): Search {
  switch (action.type) {
    case RECEIVE_SEARCH_HOT:
      const { payload: { hots } } = action;
      return {
        ...state,
        hots,
      };

    default: return state;
  }
}
export const getHots = (state: Stores) => state.search.hots;