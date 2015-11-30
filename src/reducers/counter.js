import { INCREMENT_COUNTER, DECREMENT_COUNTER, ADD_COUNTER, REMOVE_COUNTER, OVERWRITE_TOTAL, SET_STATE } from '../actions/counter';
import {today} from '../utils/general';
const update = require('react/lib/update');

const initialState = {
  counters: {},
  categories: {'1': 'Essen', '2': 'Softdrinks', '3': 'Kaffee', '4': 'Frühstück', '5': 'Eis', '6': 'Andere'},
  stores: {'1': 'Küche', '2': 'Keller'}
};

export default function counter(state = initialState, action) {
  const countToday = action.index ? ((state.counters[action.index].counts || 0)[today()] || 0)[action.store] || 0 : 0;
  const countTotal = action.index ? (state.counters[action.index].total[action.store] || 0) : 0;
  const hasStore = action.index ? (state.counters[action.index].hasStore || false) : false;
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
    return update(state, {
      counters: {
        $merge: {
          [Object.keys(state.counters).length + 1]: {
            id: Object.keys(state.counters).length + 1,
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
  case OVERWRITE_TOTAL:
    return update(state, {
      counters: {
        [action.index]: {
          total: { $merge: {[action.store]: action.amount}}
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
  default:
    return state;
  }
}
