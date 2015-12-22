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
    locations: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  }

  state = {
    showDialog: false,
    activeCategory: 1,
    activeLocation: 1,
    edit: false,
    editIndex: 0,
    barcode: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', ::this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', ::this.handleKeyDown);
  }

  openDialog() {
    this.setState({
      showDialog: true,
      edit: false
    });
  }

 _handleRequestClose() {
   this.setState({
     showDialog: false,
     edit: false
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

 edit(event, index) {
   this.setState({
     edit: true,
     showDialog: true,
     editIndex: index
   });
 }

 handleSync() {
   if (this.props.lastAction.type === 'SET_STATE') {
     this.refs.synced.show();
   }
 }

 handleKeyDown(event) {
   var code = (event.keyCode ? event.keyCode : event.which);
   if (code === 13) { // Enter key hit
     const item = this.props.barcodes[this.state.barcode];
     console.log(this.state.barcode);
     console.log(item);
     if (item) {
       this.props.decrement(item, 1, this.state.activeLocation);
     }
     this.state.barcode = '';
   } else {
     this.state.barcode += String.fromCharCode(code);
   }
 }

  render() {
    const _this = this;
    const { addCounter, removeCounter, editCounter, increment, counters, categories, locations, decrement} = this.props;
    const _categories = Object.keys(categories).map(function mapthis(cat) { return {payload: cat, text: categories[cat], route: ''}; });
    const _locations = Object.keys(locations).map(function mapthis(loc) { return {payload: loc, text: locations[loc], route: ''}; });

    this.handleSync();

    return (
      <div onKeyDown={::this.handleKeyDown} style={{fontFamily: 'Robto, System, sans-serif'}}>
      <Navigation ref="nav" onChangeCat={::this.navChange} onChangeLoc={::this.locationChange} export={::this.exportCSV} categories={_categories} locations={_locations}/>

        <FloatingActionButton style={{position: 'fixed', bottom: '1em', right: '1em', zIndex: 1}} onTouchTap={::this.openDialog}>
          <i className="material-icons" style={{color: 'white'}}>add</i>
        </FloatingActionButton>

        <AddCounter edit={this.state.edit} index={this.state.editIndex} counter={counters[this.state.editIndex] || null} show={this.state.showDialog} handleRequestClose={::this._handleRequestClose} addCounter={addCounter} editCounter={editCounter} locations={locations} categories={_categories}/>

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
              edit={_this.edit.bind(_this, counters[index].id)}
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
