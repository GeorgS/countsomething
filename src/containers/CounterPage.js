import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CounterList from '../components/CounterList';
import * as CounterActions from '../actions/counter';


function mapStateToProps(state) {
  return {
    counters: state.counter.counters,
    categories: state.counter.categories,
    locations: state.counter.stores,
    lastAction: state.lastAction
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CounterList);
