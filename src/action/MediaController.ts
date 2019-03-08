import MediaService from "../service/MediaService";
import { DispatchAbstract, AbstractParams } from './actions';
import { 
  RECEIVE_SONGS_URL,
  NEXT_SONG,
  LAST_SONG,
  RECEIVE_SONGS,
} from '../constants';
import { store } from '../App';
import numeral from 'numeral';
import { RECEIVE_PLAYER_SONGS, RECEIVE_CURRENT_SONG_URL, CONTROLL_CHANGE_PAUSED } from '../constants';

class MediaController {

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
    const { player: { playerSongs, currentSong } } = currentState;
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
      payload: {}
    });
  }

  public getSong = async (params: DispatchAbstract<{ids: string[]}>): Promise<any> => {
    const { dispatch, param: { ids } } = params;

    const payload = `ids=${ids.join(',')}`;
    const { code, songs } = await MediaService.getSong(payload);

    if (code === 200) {
      dispatch({
        type: RECEIVE_PLAYER_SONGS,
        payload: { playerSongs: songs }
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
}

export default new MediaController();