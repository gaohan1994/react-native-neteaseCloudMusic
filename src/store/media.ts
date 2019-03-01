import { Stores } from './index';
import Actions from '../action/actions';
import { RECEIVE_SONGS_URL } from '../constants';

export type Media = {
  currentSong: number;
  songs: any[];
  songsUrl: any[];
};

export const initState = {
  currentSong: 0,
  songs: [],
  songsUrl: [],
};

export default function media ( state: Media = initState,  action: Actions ): Media {
  switch (action.type) {
    case RECEIVE_SONGS_URL:
      const { payload: { songsUrl } } = action;
      return {
        ...state,
        songsUrl,
      };

    default: return state;
  }
}

export const getSongsUrl = (state: Stores) => {
  const { currentSong } = state.media;
  let songUrl: any = {};

  {
    const currentSongUrlIndex: number = state.media.songsUrl && state.media.songsUrl.length > 0 
      ? state.media.songsUrl.findIndex((s: any) => s.id === currentSong)
      : -1;

    if (currentSongUrlIndex !== -1) {
      songUrl = {
        ...songUrl,
        ...state.media.songsUrl[currentSongUrlIndex],
      };
    }
  }
  return songUrl;
};

export const getCurrentSongDetail = (state: Stores) => {
  const { currentSong } = state.media;
  let song: any = {};

  {
    const currentSongIndex: number = state.media.songs && state.media.songs.length > 0 
      ? state.media.songs.findIndex((s: any) => s.id === currentSong)
      : -1;

    if (currentSongIndex !== -1) {

      const currentSongUrl = getSongsUrl(state);
      /**
       * @param {找到歌曲了}
       */
      song = {
        ...song,
        ...state.media.songs[currentSongIndex],
        songUrl: currentSongUrl
      };

      console.log('song: ', song);
    }
  }
  
  return song;
};