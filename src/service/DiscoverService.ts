import request from '../common/request';
import config from '../common/config';

class DiscoverService {
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