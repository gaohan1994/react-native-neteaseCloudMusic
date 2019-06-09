import { RECEIVE_SEARCH_HOT, RECEIVE_SEARCH_DATA } from '../constants';
import { Stores } from './index';
import Actions from '../action/actions';

export type Search = {
  hots: any[];
  searchData: any;
};

export const initState = {
  hots: [],
  searchData: {},
};

export default function status ( state: Search = initState,  action: Actions ): Search {
  switch (action.type) {
    case RECEIVE_SEARCH_DATA:
      const { payload: { searchData } } = action;
      return {
        ...state,
        searchData, 
      }

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

export const getSearchData = (state: Stores) => state.search.searchData;