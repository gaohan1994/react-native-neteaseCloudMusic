/**
 * created by Ghan 9.3
 * 
 * redux Store
 */

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import rootReducer from './index';

import status, { Status, initState as statusState } from './status';
import search, { Search, initState as searchState } from './search';
import media, { Media, initState as mediaState } from './media';
import discover, { Discover, initState as discoverState } from './discover';
import player, { Player, initState as playerState } from './player';
import user, { User, initState as userState } from './user';

export interface Stores {
  status: Status;
  search: Search;
  discover: Discover;
  media: Media;
  player: Player;
  user: User;
}

export const StoreState = {
  status: statusState,
  search: searchState,
  discover: discoverState,
  media: mediaState,
  player: playerState,
  user: userState,
};

export default combineReducers({
  status,
  search,
  discover,
  media,
  player,
  user
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: undefined,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  const store = __DEV__ === false
    ? createStore(
      persistedReducer,
      compose(
        applyMiddleware(thunk)
      )
    )
    : createStore(
      persistedReducer,
      compose(
        applyMiddleware(thunk, createLogger)
      )
    );
  return store;
};

export { configureStore };
