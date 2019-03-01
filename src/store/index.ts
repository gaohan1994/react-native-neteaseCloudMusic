/**
 * created by Ghan 9.3
 * 
 * redux Store
 */

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './index';

import status, { Status, initState as statusState } from './status';
import search, { Search, initState as searchState } from './search';
import media, { Media, initState as mediaState } from './media';
import discover, { Discover, initState as discoverState } from './discover';

export interface Stores {
  status: Status;
  search: Search;
  discover: Discover;
  media: Media;
}

export const StoreState = {
  status: statusState,
  search: searchState,
  discover: discoverState,
  media: mediaState,
};

export default combineReducers({
  status,
  search,
  discover,
  media
});

const configureStore = () => {
  const store = __DEV__ === false
    ? createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk)
      )
    )
    : createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk, createLogger)
      )
    );
  return store;
};

export { configureStore };
