import { Stores } from './index';
import Actions from '../action/actions';
import { store } from '../App';
import { 
  RECEIVE_SONGS_URL, 
  RECEIVE_SONGS,
  RECEIVE_MV,
  RECEIVE_VIDEO,
  RECEIVE_MY_PLAYLIST,
  CHAGNE_PLAY_MOOD,
} from '../constants';

export const PLAY_MOOD = {
  ORDER_PLAYING: 'ORDER_PLAYING',
  RANDOM_PLAYING: 'RANDOM_PLAYING',
};

export function getRandomToken (length?: number) {
  const TotalLength: number = length ? length : store.getState().player.playerSongs.length;
  return Math.floor((Math.random() * TotalLength) + 1);
}

/**
 * @param {currentSong} `当前播放音乐的数组下标`
 */
export type Media = {
  songs: any[];
  songsUrl: any[];
  mv: any[];
  video: any[];
  myPlaylist: any[];
  playMood: string;
};

export const initState = {
  songs: [],
  songsUrl: [],
  mv: [],
  video: [],
  myPlaylist: [],
  playMood: PLAY_MOOD.ORDER_PLAYING,
};

export default function media ( state: Media = initState,  action: Actions ): Media {
  switch (action.type) {
    case CHAGNE_PLAY_MOOD:
      const { payload: { playMood } } = action;
      return {
        ...state,
        playMood,
      };

    case RECEIVE_MY_PLAYLIST:
      const { payload: { myPlaylist } } = action;
      return {
        ...state,
        myPlaylist
      };

    case RECEIVE_VIDEO:
      const { payload: { video } } = action;
      return {
        ...state,
        video,
      }

    case RECEIVE_MV:
      const { payload: { mv } } = action;
      return {
        ...state,
        mv
      };

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

export const getMvs = (state: Stores) => state.media.mv;

export const getVideos = (state: Stores) => state.media.video;

export const getMyPlaylist = (state: Stores) => state.media.myPlaylist;

export const getPlayMood = (state: Stores) => state.media.playMood;