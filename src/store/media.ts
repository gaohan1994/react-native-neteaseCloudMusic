import { Stores } from './index';
import Actions from '../action/actions';
import { 
  RECEIVE_SONGS_URL, 
  RECEIVE_SONGS,
} from '../constants';

/**
 * @param {currentSong} `当前播放音乐的数组下标`
 */
export type Media = {
  songs: any[];
  songsUrl: any[];
};

export const initState = {
  songs: [],
  songsUrl: [],
};

export default function media ( state: Media = initState,  action: Actions ): Media {
  switch (action.type) {


    case RECEIVE_SONGS:
      const { payload: { songs } } = action;
      return {
        ...state,
        songs,
      };

    case RECEIVE_SONGS_URL:
      const { payload: { songsUrl } } = action;
      return {
        ...state,
        songsUrl,
      };

    default: return state;
  }
}
