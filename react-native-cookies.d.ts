// 'set',
// 'setFromResponse',
// 'getFromResponse',
// 'get',
// 'getAll',
// 'clearAll',
// 'clearByName'

declare module "react-native-cookies" {

  function set(params: any, useWebKit: boolean): Promise<any>;
  function setFromResponse(params: any, cookie: any): Promise<any>;
  function getFromResponse(params: any): Promise<any>;
  function get(url: string): Promise<any>;
  function getAll(): Promise<any>;
  function clearAll(): Promise<any>;
  function clearByName(name: string): Promise<any>;
  
  export {
    set,
    setFromResponse,
    getFromResponse,
    get,
    getAll,
    clearAll,
    clearByName,
  };
}