import request from '../common/request';
import config from '../common/config';

class MediaService {

  public getSongUrl = (params: any) => {
    
    return request(
      `${config.FETCH_COMMON_ENTRY}/song/url?${params}`,
      'GET'
    );
  }

  public getPlaylistDetail = (params: any) => {

    return request(
      `${config.FETCH_COMMON_ENTRY}/playlist/detail?${params}`,
      'GET'
    );
  }
}

export default new MediaService();