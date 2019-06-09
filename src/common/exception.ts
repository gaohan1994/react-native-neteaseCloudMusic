import config from './config';
import { random } from 'lodash';

type CentermErrorResponse = {
  message: any;
  url?: string;
  status?: any;
}

/**
 * @param 
 */
let chainTimeoutCount: number = 0;
// let commonTimeoutCount: number = 0;
export const CHAIN_MAX_TIMEOUT_TIME: number = 5;
export const COMMON_MAX_TIMMOUT_TIME: number = 5;

/**
 * @todo 初始化centermError 判断如果超时超过次数那么切换节点
 *
 * @param {*} response
 * @returns {CentermErrorResponse}
 */
function initCentermError (response: any): CentermErrorResponse {
  
  if (response.code === CentermError.ErrorCode.TimeoutCode) {

    /**
     * @param {判断是否是区块链上的url如果是记次，并且超过次数切换节点}
     */
    if (response.body.headers && response.body.headers.Accept && response.body.headers.Accept === "application/json") {
      /**
       * @param {区块接口}
       * @param {chainTimeoutCount} 超时计次 +1
       */
      ++chainTimeoutCount;

      /**
       * @param {修改请求url，重置计数器}
       */
      // if (chainTimeoutCount > CHAIN_MAX_TIMEOUT_TIME) {
      //   config.FETCH_CHAIN_URL = config.BACKUP_CHAIN_URLS[random(0, config.BACKUP_CHAIN_URLS.length)]
      //   chainTimeoutCount = 0;
      //   console.log('config.FETCH_CHAIN_URL: ', config.FETCH_CHAIN_URL);
      // }
    }

    return {
      message: response.msg || '请求超时',
      url: response.body && response.body.url || ''
    };
  } else {
    return {
      message: '',
      url: response.body && response.body.url || ''
    };
  }
}

class CentermError extends Error {
  static ErrorCode = { 
    TimeoutCode: 8000
  }

  public url: string;

  constructor (response: any, data?: any) {
    console.log('response: ', response);
    console.log('data: ', data);
    super();
    const { message, status, url }: CentermErrorResponse = initCentermError(response);

    this.name = 'CentermRequestError';
    this.message = message;
    this.url = url || '';
  }
}

export default CentermError;