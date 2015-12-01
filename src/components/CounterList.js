import React, { Component, PropTypes } from 'react';
import Counter from './Counter';
import Navigation from './Navigation';
import AddCounter from './AddCounter';
import {exportCSV} from '../utils/export';
import {today} from '../utils/general';
const FloatingActionButton = require('material-ui/lib/floating-action-button');
const Snackbar = require('material-ui/lib/snackbar');

export default class CounterList extends Component {


  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
    counters: PropTypes.object.isRequired,
    addCounter: PropTypes.func.isRequired,
    removeCounter: PropTypes.func.isRequired,
    overwriteTotal: PropTypes.func.isRequired,
    locations: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  }

  state = {
    showDialog: false,
    activeCategory: 1,
    activeLocation: 1
  }

  openDialog() {
    this.setState({
      showDialog: true
    });
  }

 _handleRequestClose() {
   this.setState({
     showDialog: false
   });
 }

 navChange(event, selectedIndex) {
   this.setState({
     activeCategory: selectedIndex + 1,
   });
 }

 locationChange(event, selectedIndex) {
   this.setState({
     activeLocation: selectedIndex + 1
   });
 }

 exportCSV() {
   exportCSV({locations: this.props.locations, counters: this.props.counters});
 }

 handleSync() {
   if (this.props.lastAction.type === 'SET_STATE') {
     this.refs.synced.show();
   }
 }

  render() {
    const _this = this;
    const { addCounter, removeCounter, overwriteTotal, increment, counters, categories, locations, decrement} = this.props;
    const _categories = Object.keys(categories).map(function mapthis(cat) { return {payload: cat, text: categories[cat], route: ''}; });
    const _locations = Object.keys(locations).map(function mapthis(loc) { return {payload: loc, text: locations[loc], route: ''}; });

    this.handleSync();

    return (
      <div style={{fontFamily: 'Robto, System, sans-serif'}}>
      <Navigation ref="nav" onChangeCat={::this.navChange} onChangeLoc={::this.locationChange} export={::this.exportCSV} categories={_categories} locations={_locations}/>

        <FloatingActionButton style={{position: 'fixed', bottom: '1em', right: '1em', zIndex: 1}} onTouchTap={::this.openDialog}>
          <i className="material-icons" style={{color: 'white'}}>add</i>
        </FloatingActionButton>

        <AddCounter show={this.state.showDialog} handleRequestClose={::this._handleRequestClose} addCounter={addCounter} locations={locations} categories={_categories}/>

        { Object.keys(counters).map(function mapCounters(index) {
          if (counters[index].category === _this.state.activeCategory) {
            return (<Counter
              key={index}
              index={counters[index].id}
              name={counters[index].name}
              price={counters[index].price}
              count={counters[index].hasStore ? ((counters[index].counts[today()] || 0)[_this.state.activeLocation] || 0) : ((counters[index].counts[today()] || 0).noStore || 0)}
              location={_this.state.activeLocation}
              increment={increment}
              decrement={decrement}
              removeCounter={removeCounter}
              overwriteTotal={overwriteTotal}
              total={((counters[index].total || 0)[_this.state.activeLocation] || 0)}
              hasStore={counters[index].hasStore} />);
          }
        }) }

        <Snackbar
          ref="synced"
          message="Synced with Server"
          autoHideDuration={5000}/>
      </div>
    );
  }
}
