import request from '../common/request';
import config from '../common/config';
import { data } from '../common/data';

class MediaService {
  public getSong = (params: any) => {
    console.log(`${config.FETCH_COMMON_ENTRY}/song/detail?${params}`);
    return request(
      `${config.FETCH_COMMON_ENTRY}/song/detail?${params}`,
      'GET'
    )
  }

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

  public getMv = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/personalized/mv`,
      'GET',
    )
  }

  public getVideo = (params: any) => {
    // return request(
    //   `${config.FETCH_COMMON_ENTRY}/video/group?${params}`,
    //   'GET',
    // )
    console.log('data: ', data);
    return data;
  }

  public getVideoDetail = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/video/detail?${params}`,
      'GET',
    )
  }

  public getVideoUrl = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/video/url?${params}`,
      'GET',
    )
  }

  public getMinePlaylist = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/user/playlist?${params}`
    )
  }
}

export default new MediaService();