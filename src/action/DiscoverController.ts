import DiscoverService from "../service/DiscoverService";
import { store } from '../App';
import { RECEIVE_BANNERS } from '../constants';

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
}

export default new DiscoverController();