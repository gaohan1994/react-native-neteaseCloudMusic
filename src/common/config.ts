
/**
 * created by Ghan 9.3
 * @todo 设置常用的配置信息并根据环境变量导出
 * @todo 配置不会因为环境改变的数据项
 * @param {DEFAULT_DOCUMENT_TITLE} string 默认head title
 * @param {DEFAULT_FETCH_METHOD} string 默认请求method defalut post
 * @export
 * @interface DefaultCommonConfig
 */

export interface DefaultCommonConfig {
  DEFAULT_FETCH_METHOD: 'POST' | 'GET' | 'post' | 'get';
  DEFAULT_FETCH_TIMEOUT: number;
  FETCH_COMMON_ENTRY: string;
  SAVE_MODAL_TIME: number;
}

export type environment = string

function getEnvironmentConfig () {
  /**
   * @param {environment} `production` || `development`
   */
  const environment: environment = 'development';

  if (environment === 'production') {
    return {

      FETCH_COMMON_ENTRY: 'http://localhost:3000', // production
    };
  } else {
    return {
      FETCH_COMMON_ENTRY: 'http://localhost:3000', // development
    };
  }
}

// 测试环境 http://202.101.149.132:7680/BKMS_HMS/GateWayAction.do
const config: DefaultCommonConfig = {
  ...getEnvironmentConfig(),
  DEFAULT_FETCH_METHOD: 'GET',
  DEFAULT_FETCH_TIMEOUT: 18000,
  SAVE_MODAL_TIME: 340, // > 30
};

export default config;

const isArrayFn = (value: any): boolean => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

/**
 * connect 需要用到的merge工具
 * @param stateProps 
 * @param dispatchProps 
 * @param ownProps 
 */
export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

/**
 * len: 需要字符串的长度
 *
 * @export
 * @param {*} len
 * @returns
 */
export function randomString(len: number): string {
  const length = len || 32;
  /**
   * @param { $chars 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 }
   * @param { $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' }
   */
  const $chars = '0123456789';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

export { isArrayFn, };