import { Stores } from './index';
import Actions from '../action/actions';
import { 
  RECEIVE_CURRENT_SONG_URL,
  CONTROLL_CHANGE_PAUSED,
  NEXT_SONG,
  LAST_SONG,
  RECEIVE_PLAYER_SONGS,
  CONTROLL_CURRENT_DETAIL,
} from '../constants';
import { merge } from 'lodash';

export interface MediaControll {
  paused: boolean;
  currentTime: string;
  sliderProgress: number;
  duration: string;
  playTime: string;
  ff: any;
}

/**
 * @param {currentSong} `当前播放音乐的数组下标`
 */
export type Player = {
  controll: MediaControll;
  currentSong: number;
  playerSongs: any[];
};

export const initState = {
  controll: {
    paused: false,
    currentTime: '0',
    sliderProgress: 0,
    duration: '0',
    playTime: '0',
    ff: 0,
  },
  currentSong: -1,
  playerSongs: [],
};

export default function media ( state: Player = initState,  action: Actions ): Player {
  switch (action.type) {
    case CONTROLL_CURRENT_DETAIL:
      const { payload: { controll } } = action;
      return {
        ...state,
        controll: {
          ...state.controll,
          ...controll
        }
      };

    case LAST_SONG:
      return {
        ...state,
        currentSong: state.currentSong - 1
      };

    case NEXT_SONG:
      return {
        ...state,
        currentSong: state.currentSong + 1
      };


    case CONTROLL_CHANGE_PAUSED:
      const { payload: { paused } } = action;
      return {
        ...state,
        controll: {
          ...state.controll,
          paused,
        }
      };
    
    case RECEIVE_PLAYER_SONGS:
      const { payload: { playerSongs, currentSong } } = action;
      return {
        ...state,
        playerSongs,
        currentSong: currentSong || 0
      };

    case RECEIVE_CURRENT_SONG_URL:
      const { payload: { currentSongUrl } } = action;

      const { id } = currentSongUrl[0];

      const index = state.playerSongs.findIndex((s: any) => s.id === id);

      if (index !== -1) {
        /**
         * @param {找到了}
         */
        const currentSongDetail = {
          ...state.playerSongs[index],
          url: currentSongUrl[0]
        };

        state.playerSongs[index] = currentSongDetail;
        console.log('currentSongDetail ', currentSongDetail);
        return merge({}, state, {});
      } else {
        return state;
      }
    default: return state;
  }
}

export const getControll = (state: Stores): MediaControll => state.player.controll;

export const getCurrentSongDetail = (state: Stores): any => {
  return state.player.currentSong === -1 ? {} : state.player.playerSongs[state.player.currentSong];
}