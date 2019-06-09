import request from '../common/request';
import config from '../common/config';
import { jsonToQueryString } from './ApiService';

class DiscoverService {

  public playlistSubscribe = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/playlist/subscribe${jsonToQueryString(params)}`,
      'get'
    )
  }

  public banner = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/banner`,
      'GET',
    )
  }

  public personalized = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/personalized`,
      'GET',
    )
  }

  public personalizedNewSong = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/personalized/newsong`,
      'GET',
    );
  }

  public playlistDetail = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/playlist/detail?${params}`,
      'GET'
    )
  }
}

export default new DiscoverService();