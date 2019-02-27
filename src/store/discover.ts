import { RECEIVE_BANNERS } from '../constants';
import { Stores } from './index';
import Actions from '../action/actions';

export type Discover = {
  banners: any[];
};

export const initState = {
  banners: [],
};

export default function discover ( state: Discover = initState,  action: Actions ): Discover {
  switch (action.type) {
    case RECEIVE_BANNERS:
      const { payload: { banners } } = action;
      return {
        ...state,
        banners,
      };

    default: return state;
  }
}

export const getBanners = (state: Stores) => state.discover.banners;