import request from '../common/request';
import config from '../common/config';
import { data } from '../common/data';
import { jsonToQueryString } from './ApiService';

class MediaService {

  public removeCollect = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/collection/remove`,
      'post',
      {...params}
    )
  }

  public addCollct = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/collection/add`,
      'post',
      {...params}
    )
  }

  public collectList = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/collection/list`,
      'post',
      {...params}
    )
  }

  public addComment = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/comment/add`,
      'post',
      {...params}
    )
  }

  public getSongComments = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/comment/list`,
      'post',
      {...params}
    )
  }

  public getSongLyc = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/lyric${jsonToQueryString(params)}`,
      'get'
    )
  }

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