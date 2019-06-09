import request from '../common/request';
import config from '../common/config';


export const jsonToQueryString = (json: any) => {
  return '?' + 
      Object.keys(json).map(function(key) {
          return key + '=' + json[key];
      }).join('&');
}

class ApiService {

  public commentAdd = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/plateform/comment/add`,
      'post',
      {...params}
    )
  }

  public commentList = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/plateform/comment/list`,
      'post',
      {...params}
    )
  }

  public collectionAdd = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/plateform/collection/add`,
      'post',
      {...params}
    )
  }

  public collectionRemove = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/plateform/collection/remove`,
      'post',
      {...params}
    )
  }

  public collectionList = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/plateform/collection/list`,
      'post',
      {...params}
    )
  }


}

export default new ApiService();