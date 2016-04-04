import { INCREMENT_COUNTER, DECREMENT_COUNTER, ADD_COUNTER, REMOVE_COUNTER, SET_STATE, EDIT_COUNTER } from '../actions/counter';
import {today} from '../utils/general';
const update = require('react/lib/update');

const initialState = {
  counters: {},
  categories: {'1': 'Essen', '2': 'Softdrinks', '3': 'Kaffee', '4': 'Frühstück', '5': 'Eis', '6': 'Andere'},
  stores: {'1': 'Küche', '2': 'Keller'},
  barcodes: {}
};

export default function counter(state = initialState, action) {
  const countToday = action.index ? (((state.counters[action.index] || 0).counts || 0)[today()] || 0)[action.store] || 0 : 0;
  const countTotal = action.index ? (((state.counters[action.index] || 0).total || 0)[action.store] || 0) : 0;
  const hasStore = action.index ? ((state.counters[action.index] || 0).hasStore || false) : false;
  switch (action.type) {
  case SET_STATE:
    return action.payload || state;
  case INCREMENT_COUNTER:
    return update(state, {
      counters: {
        [action.index]: {
          total: { $merge: {[action.store]: countTotal + action.amount}},
          counts: { $merge: {[today()]: {[action.store]: countToday - (((countToday - action.amount) < 0) ? 0 : action.amount)} } }
        }
      }
    });
  case DECREMENT_COUNTER:
    return update(state, {
      counters: {
        [action.index]: {
          total: { $merge: {[action.store]: countTotal - (((countTotal - action.amount) < 0) ? 0 : action.amount)}},
          counts: { $merge: {[today()]: {[action.store]: (((countTotal - action.amount) < 0) && hasStore) ? countToday : (countToday + action.amount)} } }
        }
      }
    });
  case ADD_COUNTER:
    var keys = Object.keys(state.counters);
    var newKey = parseInt(keys[keys.length - 1], 10) + 1;
    return update(state, {
      counters: {
        $merge: {
          [newKey]: {
            id: newKey,
            total: action.hasStore ? action.total : {noStore: action.total},
            name: action.name,
            counts: {},
            category: action.category,
            price: action.price,
            hasStore: action.hasStore
          }
        }
      }
    });
  case REMOVE_COUNTER:
    return update(state, {
      counters: {$apply: function(counters) {
        delete counters[action.index];
        return counters;
      }}
    });
  case EDIT_COUNTER:
    return update(state, {
      counters: {
        [action.index]: {
          $merge: action.counter
        }
      }
    });
  default:
    return state;
  }
}
