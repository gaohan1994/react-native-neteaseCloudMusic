import DiscoverService from "../service/DiscoverService";
import { store } from '../App';
import { 
  RECEIVE_BANNERS, 
  RECEIVE_PERSONALIZED, 
  RECEIVE_PERSONALIZED_NEWSONG
} from '../constants';
import { AbstractParams } from './actions';
import { RECEIVE_PLAYLIST_DETAIL } from '../constants';

class DiscoverController {

  public playlistSubscribe = async (params: any) => {
    const { code } = await DiscoverService.playlistSubscribe(params);
    
    if (code === 200) {
      return { success: true };
    } else {
      return { success: false, result: '系统异常' };
    }
  }

  public banner = async (): Promise<any> => {
    const { code, banners } = await DiscoverService.banner();
    
    if (code === 200) {

      console.log('result: ', banners);
      store.dispatch({
        type: RECEIVE_BANNERS,
        payload: { banners }
      });
    }
  }

  public personalized = async (): Promise<any> => {
    const { code, result } = await DiscoverService.personalized();

    if (code === 200) {

      store.dispatch({
        type: RECEIVE_PERSONALIZED,
        payload: { personalized: result }
      })
    }
  }

  public personalizedNewSong = async (): Promise<any> => {
    const { code, result } = await DiscoverService.personalizedNewSong();

    if (code === 200) {

      store.dispatch({
        type: RECEIVE_PERSONALIZED_NEWSONG,
        payload: { personalizedNewSong: result }
      })
    }
  }

  public playlistDetail = async (params: AbstractParams<any>): Promise<any> => {
    const { param } = params;
    const { code, playlist } = await DiscoverService.playlistDetail(param);

    if (code === 200) {
      store.dispatch({
        type: RECEIVE_PLAYLIST_DETAIL,
        payload: { playlistDetail: playlist }
      })
    }
  }
}

export default new DiscoverController();