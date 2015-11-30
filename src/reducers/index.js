import { combineReducers } from 'redux';
import counter from './counter';
//import { persistentReducer } from 'redux-pouchdb';

const rootReducer = combineReducers({
  counter: counter, // persistentReducer(counter)
  lastAction: (state = null, action) => {
    return action;
  }
});

export default rootReducer;
