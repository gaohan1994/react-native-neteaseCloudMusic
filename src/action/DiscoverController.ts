import DiscoverService from "../service/DiscoverService";
import { store } from '../App';
import { 
  RECEIVE_BANNERS, 
  RECEIVE_PERSONALIZED, 
  RECEIVE_PERSONALIZED_NEWSONG
} from '../constants';

class DiscoverController {
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
}

export default new DiscoverController();