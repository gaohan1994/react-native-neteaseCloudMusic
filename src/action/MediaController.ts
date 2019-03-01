import MediaService from "../service/MediaService";
import { DispatchAbstract } from './actions';
import { RECEIVE_SONGS_URL } from '../constants';

class MediaController {

  public getSongUrl = async (params: DispatchAbstract<{ids: string[]}>): Promise<any> => {
    const { dispatch, param: { ids } } = params;

    const payload = `id=${ids.join(',')}`;
    const { code, data } = await MediaService.getSongUrl(payload);

    if (code === 200) {
      dispatch({
        type: RECEIVE_SONGS_URL,
        payload: { songsUrl: data }
      })
    } else {
      return { success: false };
    }
  }
}

export default new MediaController();