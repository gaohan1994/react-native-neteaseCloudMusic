import request from '../common/request';
import config from '../common/config';
import { jsonToQueryString } from './ApiService';

class SearchService {

  public search = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/search${jsonToQueryString(params)}`,
      'get'
    )
  }

  public searchHot = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/search/hot`,
      'GET',
    );
  }
}

export default new SearchService();