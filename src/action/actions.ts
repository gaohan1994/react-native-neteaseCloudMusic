/**
 * @param { Type File }
 * 
 * 抽象 Reducer Action type 接口 EosActionAbstractInterface
 * 
 */

import { 
  RECEIVE_SEARCH_HOT,
  RECEIVE_BANNERS,
  RECEIVE_SONGS_URL,
  RECEIVE_PERSONALIZED,
  RECEIVE_PERSONALIZED_NEWSONG,
  RECEIVE_PLAYLIST_DETAIL,
  RECEIVE_CURRENT_SONG_URL,
  CONTROLL_CHANGE_PAUSED,
  NEXT_SONG,
  LAST_SONG,
  RECEIVE_SONGS,
  RECEIVE_PLAYER_SONGS,
  CONTROLL_CURRENT_DETAIL,
  RECEIVE_MV,
  RECEIVE_VIDEO,
  RECEIVE_MY_PLAYLIST,
  CONTROLL_CURRENT_SONG,
  RECEIVE_USERDETAIL,
  CHANGE_LOGIN_STATUS,
  SAVE_USERINFO,
  RECEIVE_SONG_LYC,
} from '../constants';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';

export interface ActionAbstractInterface {
  type: 
    RECEIVE_SEARCH_HOT |
    RECEIVE_BANNERS |
    RECEIVE_SONGS_URL |
    RECEIVE_PERSONALIZED |
    RECEIVE_PERSONALIZED_NEWSONG |
    RECEIVE_PLAYLIST_DETAIL |
    RECEIVE_CURRENT_SONG_URL |
    CONTROLL_CHANGE_PAUSED |
    NEXT_SONG |
    LAST_SONG |
    RECEIVE_SONGS |
    RECEIVE_PLAYER_SONGS |
    CONTROLL_CURRENT_DETAIL |
    RECEIVE_MV |
    RECEIVE_VIDEO |
    RECEIVE_MY_PLAYLIST |
    CONTROLL_CURRENT_SONG |
    RECEIVE_USERDETAIL |
    CHANGE_LOGIN_STATUS |
    SAVE_USERINFO |
    RECEIVE_SONG_LYC;
  payload: any;
}

type Actions = ActionAbstractInterface;

export type MyDispatch = ThunkDispatch<any, any, any> | Dispatch<Actions>;

export interface AbstractParams<T extends Object = {}> {
  param: T;
}

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