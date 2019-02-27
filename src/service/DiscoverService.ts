import request from '../common/request';
import config from '../common/config';

class DiscoverService {
  public banner = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/banner`,
      'GET',
    )
  }
}

export default new DiscoverService();