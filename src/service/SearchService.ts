import request from '../common/request';
import config from '../common/config';

class SearchService {

  public searchHot = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/search/hot`,
      'GET',
    );
  }
}

export default new SearchService();