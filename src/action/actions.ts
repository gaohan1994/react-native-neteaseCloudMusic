/**
 * @param { Type File }
 * 
 * 抽象 Reducer Action type 接口 EosActionAbstractInterface
 * 
 */

import { 
  RECEIVE_SEARCH_HOT,
  RECEIVE_BANNERS,
} from '../constants';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';

export interface ActionAbstractInterface {
  type: 
    RECEIVE_SEARCH_HOT |
    RECEIVE_BANNERS;
  payload: any;
}

type Actions = ActionAbstractInterface;

export type MyDispatch = ThunkDispatch<any, any, any> | Dispatch<Actions>;

export interface DispatchAbstract<T extends Object = {}> {
  param: T;
  dispatch: MyDispatch;
}

export interface  DispatchAbstract<T extends Object = {}, P extends Object = {}> {
  param: T;
  option?: P;
  dispatch: MyDispatch;
}

export interface AbstractInterfaceParam<T extends Object> {
  result?: T;
  success: boolean;
}

export default Actions;