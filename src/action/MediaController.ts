import MediaService from "../service/MediaService";
import { DispatchAbstract, AbstractParams } from './actions';
import { 
  NEXT_SONG,
  LAST_SONG,
  RECEIVE_VIDEO,
  RECEIVE_MY_PLAYLIST,
  CONTROLL_CURRENT_SONG
} from '../constants';
import { store } from '../App';
import numeral from 'numeral';
import { RECEIVE_PLAYER_SONGS, RECEIVE_CURRENT_SONG_URL, CONTROLL_CHANGE_PAUSED, RECEIVE_MV, RECEIVE_SONG_LYC, CHAGNE_PLAY_MOOD } from '../constants';

class MediaController {

  public changePlayMood = async (mood: any) => {
    
    await store.dispatch({
      type: CHAGNE_PLAY_MOOD,
      payload: {
        playMood: mood
      }
    });
    return { success: true };
  }

  public playerControll = async (params: AbstractParams) => {
    const { param } = params;

    store.dispatch({
      type: CONTROLL_CHANGE_PAUSED,
      payload: param
    });
  }

  public lastSong = async (): Promise<any> => {
    const currentState = store.getState();
    const { player: { playerSongs, currentSong } } = currentState;
    /**
     * @param {0.判断是否有歌}
     */
    if (playerSongs && playerSongs.length === 0) {
      return { success: false, message: '切歌失败' };
    }
    
    /**
     * @param {1.判断是否有上一曲}
     */
    if (!playerSongs[numeral(currentSong).value() - 1]) {
      return { success: false, message: '没有上一首歌' };
    }

    /**
     * @param {成功}
     */
    store.dispatch({
      type: LAST_SONG,
      payload: {}
    });
  }

  public nextSong = async (): Promise<any> => {
    const currentState = store.getState();
    const { player: { playerSongs, currentSong }, media: { playMood } } = currentState;
    /**
     * @param {0.判断是否有歌}
     */
    if (playerSongs && playerSongs.length === 0) {
      return { success: false, message: '切歌失败' };
    }
    
    /**
     * @param {1.判断是否有下一曲}
     */
    if (!playerSongs[numeral(currentSong).value() + 1]) {
      return { success: false, message: '没有下一首歌' };
    }

    /**
     * @param {成功}
     */
    store.dispatch({
      type: NEXT_SONG,
      payload: { playMood }
    });
  }

  public getSong = async (params: DispatchAbstract<{ids: string[], currentSong: any}>): Promise<any> => {
    const { dispatch, param: { ids, currentSong } } = params;

    const payload = `ids=${ids.join(',')}`;
    const { code, songs } = await MediaService.getSong(payload);

    if (code === 200) {
      dispatch({
        type: RECEIVE_PLAYER_SONGS,
        payload: { playerSongs: songs }
      });
      console.log('currentSong: ', currentSong);
      const currentId = currentSong.id;
      const index = ids.findIndex((id: any) => `${id}` === `${currentId}`);

      dispatch({
        type: CONTROLL_CURRENT_SONG,
        payload: { currentSong: index }
      });
      return { success: true };
    } else {
      return { success: false };
    }
  }

  public getSongUrl = async (params: DispatchAbstract<{ids: string[]}>): Promise<any> => {
    const { dispatch, param: { ids } } = params;

    const payload = `id=${ids.join(',')}`;
    const { code, data } = await MediaService.getSongUrl(payload);

    if (code === 200) {
      dispatch({
        type: RECEIVE_CURRENT_SONG_URL,
        payload: { currentSongUrl: data }
      })
    } else {
      return { success: false };
    }
  }

  public getSongLyc = async (params: any) => {
    
    const { code, lrc, msg } = await MediaService.getSongLyc(params);

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_SONG_LYC,
        payload: {
          lyc: {
            ...lrc,
            id: params.id
          }
        }
      });
      return { success: true, result: lrc };
    } else {
      return { success: false, result: msg };
    }
  }

  public getMv = async (): Promise<any> => {

    const { code, result } = await MediaService.getMv();

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_MV,
        payload: { mv: result }
      })

      return { success: true };
    } else {
      return { success: false };
    }
  }

  public getVideo = async (): Promise<any> => {
    const videoGroupId = 'id=9104';
    const { code, datas } = await MediaService.getVideo(videoGroupId);

    if (code === 200) {
      const videoData = datas.map((video: any) => {
        return video.data;
      });
      console.log('videoData: ', videoData);
      store.dispatch({
        type: RECEIVE_VIDEO,
        payload: {
          video: videoData
        }
      })
    } else {
      return { success: false };
    }
  }

  public getMinePlaylist = async (): Promise<any> => {
    const { user: { userDetail } } = await store.getState();
    const payload = `uid=${userDetail.profile.userId}`;
    const { code, playlist } = await MediaService.getMinePlaylist(payload);

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_MY_PLAYLIST,
        payload: {
          myPlaylist: playlist
        }
      })
    } else {
      return { success: false };
    }
  }
}

export default new MediaController();