import { 
  RECEIVE_BANNERS, 
  RECEIVE_PERSONALIZED,
  RECEIVE_PERSONALIZED_NEWSONG,
} from '../constants';
import { Stores } from './index';
import Actions from '../action/actions';

export type Discover = {
  banners: any[];
  personalized: any[];
  personalizedNewSong: any[];
};

export const initState = {
  banners: [],
  personalized: [],
  personalizedNewSong: [],
};

export default function discover ( state: Discover = initState,  action: Actions ): Discover {
  switch (action.type) {
    case RECEIVE_BANNERS:
      const { payload: { banners } } = action;
      return {
        ...state,
        banners,
      };

    case RECEIVE_PERSONALIZED:
      const { payload: { personalized } } = action;
      return {
        ...state,
        personalized,
      }

    case RECEIVE_PERSONALIZED_NEWSONG:
      const { payload: { personalizedNewSong } } = action;
      return {
        ...state,
        personalizedNewSong
      };
    default: return state;
  }
}

export const getBanners = (state: Stores) => state.discover.banners;

export const getPersonalized = (state: Stores) => state.discover.personalized;

export const getPersonalizedNewSong = (state: Stores) => state.discover.personalizedNewSong;