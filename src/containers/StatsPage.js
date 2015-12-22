import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stats from '../components/Stats';
import * as CounterActions from '../actions/counter';


function mapStateToProps(state) {
  return {
    counters: state.counter.counters,
    categories: state.counter.categories,
    locations: state.counter.stores,
    barcodes: state.counter.barcodes,
    lastAction: state.lastAction
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Stats);
