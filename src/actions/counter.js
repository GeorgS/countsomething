export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const UNDO_COUNTER = 'UNDO_COUNTER';
export const REDO_COUNTER = 'REDO_COUNTER';

export const ADD_COUNTER = 'ADD_COUNTER';
export const REMOVE_COUNTER = 'REMOVE_COUNTER';
export const EDIT_COUNTER = 'EDIT_COUNTER';

export const SET_STATE = 'SET_STATE';

export function increment(index, amount, store) {
  return {
    type: INCREMENT_COUNTER,
    index,
    amount,
    store
  };
}

export function decrement(index, amount, store) {
  return {
    type: DECREMENT_COUNTER,
    index,
    amount,
    store
  };
}

export function undo() {
  return {
    type: UNDO_COUNTER
  };
}

export function redo() {
  return {
    type: REDO_COUNTER
  };
}

export function addCounter(props) {
  return {
    type: ADD_COUNTER,
    name: props.name,
    price: props.price,
    total: props.total || {},
    category: props.category,
    hasStore: props.hasStore
  };
}

export function removeCounter(index) {
  return {
    type: REMOVE_COUNTER,
    index
  };
}

export function editCounter(counter) {
  return {
    type: EDIT_COUNTER,
    index: counter.id,
    counter
  };
}
