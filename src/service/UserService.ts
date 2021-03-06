import request from '../common/request';
import config from '../common/config';
import { jsonToQueryString } from './ApiService';

class UserService {

  public register = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/register`,
      'post',
      {...params}
    )
  }

  public captchSent = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/captch/sent${jsonToQueryString(params)}`,
      'get'
    )
  }

  public logout = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/logout`,
      'get'
    );
  }

  /**
   * 网易注册
   */
  public captchRegister = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/captch/register${jsonToQueryString(params)}`,
      'get'
    );
  }

  public loginCellphone = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/login/cellphone${jsonToQueryString(params)}`,
      'get'
    );
  }

  public userAdd = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/register`,
      'post',
      {...params}
    );
  }

  public checkLoginNameUnique = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/system/user/checkLoginNameUnique`,
      'post',
      {...params}
    );
  }
  public userEdit = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/system/user/edit`,
      'post',
      {...params}
    );
  }
  public resetPwd = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/system/user/resetPwd`,
      'post',
      {...params}
    );
  }
  public login = (params: any) => {
    return request(
      `${config.FETCH_API_ENTRY}/app/loginApp`,
      'post',
      {...params}
    );
  }

  public refresh = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/login/refresh`,
      'GET',
    )
  }

  public loginStatus = () => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/login/status`,
      'GET'
    )
  }

  public userDeatail = (params: any) => {
    return request(
      `${config.FETCH_COMMON_ENTRY}/user/detail?${params}`,
      'GET',
    )
  }
}

export default new UserService();