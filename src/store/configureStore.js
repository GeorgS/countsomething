/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
// reducer
import rootReducer from '../reducers';
// middleware
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
//import { persistentStore } from 'redux-pouchdb';
import io from 'socket.io-client'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

const enforceImmutableMiddleware = require('redux-immutable-state-invariant')();


let createStoreWithMiddleware;

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const { persistState } = require('redux-devtools');
  const DevTools = require('../containers/DevTools');
  createStoreWithMiddleware = compose(
    applyMiddleware(
      enforceImmutableMiddleware,
      thunkMiddleware,
      promiseMiddleware,
      loggerMiddleware
    ),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware)
  )(createStore);
}


/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  var live = io.connect('http://localhost:3333');
  live.on('connect', function connectToServer() {
    console.log('Connected to Server');
    live.on('state', function onState(data) {
      store.dispatch({type: 'SET_STATE', payload: JSON.parse(data)});
    });

    store.subscribe(() => {
      if (store.getState().lastAction.type !== 'SET_STATE') {
        live.emit('state', JSON.stringify(store.getState()));
      }
    });
  });

  return store;
}
