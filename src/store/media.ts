import { Stores } from './index';
import Actions from '../action/actions';
import { 
  RECEIVE_SONGS_URL, 
  RECEIVE_SONGS,
  RECEIVE_MV,
  RECEIVE_VIDEO,
  RECEIVE_MY_PLAYLIST,
} from '../constants';

/**
 * @param {currentSong} `当前播放音乐的数组下标`
 */
export type Media = {
  songs: any[];
  songsUrl: any[];
  mv: any[];
  video: any[];
  myPlaylist: any[];
};

export const initState = {
  songs: [],
  songsUrl: [],
  mv: [],
  video: [],
  myPlaylist: []
};

export default function media ( state: Media = initState,  action: Actions ): Media {
  switch (action.type) {
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