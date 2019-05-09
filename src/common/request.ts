import config from '../common/config';
import Dialog from '../component/Dialog';
import { store } from '../App';
import { CHANGE_LOADING } from '../constants';
import CentermError from './exception';
/**
 * 加密处理
 */
export const getDefaultConfig = (body: any) => {
    return {
        ...body,
    };
};

/**
 * 打印工具如果是测试环境打印，生产环境不打印
 * @param message string 打印信息
 */
const ConsoleUtil = (message: any, title?: string): void => {
  if (title) {
    console.log(`---------------------- ${title} ----------------------`);
  }
  console.log(message);
  if (title) {
    console.log(`---------------------- ${title}结束 ----------------------`);
  }
};

/**
 * 默认错误处理函数
 * @param error RequsetError
 */
const defaultErrorCallback: GenericCallbackT<any> = async (error) => {

    const state = await store.getState();

    /**
     * @param {loading} 全局loading 为true
     */
    if (state.status.loading === true) {
        store.dispatch({ type: CHANGE_LOADING, payload: { loadig: false } });
    }

    if (typeof error === 'string') {
        Dialog.showToast(error);
    } else {
        Dialog.showToast('网络异常');
    }
    ConsoleUtil(error, '错误信息');
    throw new Error(error);
};
  
/**
 * 回调函数类型
 * 
 * 接受类型 T 和数据类型是T的数据 arg 返回 void
 * @interface GenericCallbackFn
 */
export interface GenericCallbackFn {
    <T>(arg: T): void;
}

/**
 *  回调函数类型
 *
 * @interface GenericCallbackT
 * @template T
 */
export interface GenericCallbackT<T> {
    (arg: T): void;
}

export interface RequsetError {
    message?: string;
}

export type WithTimeoutOptions = {
    type: 'chain' | 'common';
}

/**
 * @param {withTimeout} 加入请求接口超时 
 * 
 * @param {CentermError} 加入切换节点
 */
export const withTimeout = (time: number) => (promise: any, option?: any) =>
    Promise.race([
        promise,
        new Promise((resolve, reject)=> 
            setTimeout((_: any) => reject(
                // new CentermError({code: CentermError.ErrorCode.TimeoutCode, msg: '请求超时！请检查网络连接！', body: option})
            ), time)
        )
    ]);

const detaultTimeoutFetch = withTimeout(config.DEFAULT_FETCH_TIMEOUT);

/**
 * 发起一个api请求
 * 
 * ------ Usaga ------
 * 
 * request('/me') // throw away the response
 * 
 * request('/me', function(r) { console.log(r) })
 * 
 * request('/me', 'post', function(r) { console.log(r) })
 * 
 * request('/me', { fields: 'email' }) // throw away the response
 * 
 * request(
 *  '/me',
 *  'POST',
 *  { body: 'hi there' },
 *  function(r) {
 *     console.log(r)
 *  }
 * )
 * 
 * ------ over ------
 * 
 * @class CentermSDK
 */
const request = (
    url: string,
    ...args: Array<any>
): any => {
    console.log('fetch url: ', url);
    const argByType: any = {};
    const functions: Array<GenericCallbackFn> = [];
    let callback: GenericCallbackFn;
    let errorCallback: GenericCallbackT<RequsetError> = defaultErrorCallback;

    args.forEach(arg => {

        if (typeof arg === 'function') {
            /**
             * 如果是 function push 到 functions 中
             */
            functions.push(arg);
        } else {
            argByType[typeof arg] = arg;
        }
    });

    /**
     *  判断长度 第一个是 callback 第二个是 errorcallback
     */

    if (functions && functions.length > 0) {
        if (functions.length === 1) {
            callback = functions[0];
        } else if (functions.length === 2) {
            callback = functions[0];
            errorCallback = functions[1];
        }
    }

    const httpMethod = (argByType.string || config.DEFAULT_FETCH_METHOD).toUpperCase();
    const params = argByType.object || {};
    let options: any = {
        url,

        json: true,

        /* 默认method */
        method: httpMethod,

        /* 默认headers */
        headers: {
            // 'Content-Type': 'text/html; charset=utf-8',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8', /* 默认格式 */
            // 'credentials': 'include',
        }
    };

    /* 处理body */
    if (options.method) {
        if (options.method.toUpperCase() === 'POST') {
            options.body = params
            ? JSON.stringify(params) 
            : '';
        }
    }
    
    ConsoleUtil(options, '请求报文');

    try {
        return detaultTimeoutFetch(fetch(url, options), options)
        .then((response: any) => response.json())
        .then((responseJson: any) => {
            ConsoleUtil(responseJson, '响应报文');
            if (callback) {
                callback(responseJson);
            }
            return responseJson;
        })
        .catch((e: any) => {
            errorCallback(e);
        });
    } catch (error) {
        console.log('error url: ', url);
        console.log('error: ', error);
        errorCallback(error);
    }
};

/**
 * @todo 非 eos 接口
 * @param url 
 * @param args 
 */
export const commonRequest = (
    url: string,
    ...args: Array<any>
): any => {
    // url = config.FETCH_COMMON_ENTRY;
    const argByType: any = {};
    const functions: Array<GenericCallbackFn> = [];
    let callback: GenericCallbackFn;
    let errorCallback: GenericCallbackT<RequsetError> = defaultErrorCallback;

    args.forEach(arg => {

        if (typeof arg === 'function') {
            /**
             * 如果是 function push 到 functions 中
             */
            functions.push(arg);
        } else {
            argByType[typeof arg] = arg;
        }
    });

    /**
     *  判断长度 第一个是 callback 第二个是 errorcallback
     */

    if (functions && functions.length > 0) {
        if (functions.length === 1) {
            callback = functions[0];
        } else if (functions.length === 2) {
            callback = functions[0];
            errorCallback = functions[1];
        }
    }

    const httpMethod = (argByType.string || config.DEFAULT_FETCH_METHOD).toUpperCase();
    const params = argByType.object || {};
    let options: RequestInit = {

        /* 默认method */
        method: httpMethod,

        /* 默认headers */
        headers: {
            // 'Content-Type': 'text/html; charset=utf-8',
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', /* 默认格式 */
            // 'credentials': 'include',
        }
    };

    ConsoleUtil(params, '请求报文');

    /* 处理body */
    if (options.method) {
        if (options.method.toUpperCase() === 'POST') {
            options.body = params
            ? JSON.stringify(getDefaultConfig(params)) 
            : '';
        }
    }
    console.log('url: ', url);
    console.log('options: ', options);

    try {
        return detaultTimeoutFetch(fetch(url, options), options)
        .then((response: any) => response.json())
        .then((responseJson: any): any => {
            ConsoleUtil(responseJson, '响应报文');
            if (callback) {
                callback(responseJson);
            }
            return responseJson;
        })
        .catch((e: any) => {
            console.log('e: ', e);
            errorCallback(e);
            return false;
        });
    } catch (error) {
        console.log('error: ', error);
        errorCallback(error);
    }
};

export default request;