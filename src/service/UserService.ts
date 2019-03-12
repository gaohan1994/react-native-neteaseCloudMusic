import request from '../common/request';
import config from '../common/config';

class UserService {

  public login = (params: any) => {
    
    return request(
      `${config.FETCH_COMMON_ENTRY}/login/cellphone?${params}`,
      'GET',
    )
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
}

export default new UserService();