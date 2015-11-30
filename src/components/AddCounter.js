import React, { Component, PropTypes } from 'react';
const Dialog = require('material-ui/lib/dialog');
const TextField = require('material-ui/lib/text-field');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const Checkbox = require('material-ui/lib/checkbox');

export default class AddCounter extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    addCounter: PropTypes.func.isRequired
  }

  state = {
    newCounterCategory: 1,
    show: false,
    showStoreOptions: false
  }

  newCounterDropdownChange(event, selectedIndex) {
    this.setState({
      newCounterCategory: selectedIndex,
      show: this.props.show
    });
  }

  _handleRequestClose() {
    this.setState({showStoreOptions: false});
    this.props.handleRequestClose();
  }

  addCounter() {
    const _this = this;
    const hasStorage = this.refs.hasStorage.isChecked();
    const locations = this.props.locations;
    const stores = {};

    Object.keys(locations).forEach(function(key) {
      stores[key] = _this.refs['location_' + key].getValue();
    });
    
    this.props.addCounter({
      name: _this.refs.newCounterName.getValue(),
      amount: hasStorage ? stores : parseFloat(_this.refs.newCounterAmount.getValue()),
      category: this.state.newCounterCategory,
      hasStore: hasStorage,
      price: parseFloat(_this.refs.newCounterPrice.getValue().replace(',', '.'))
    });

    React.findDOMNode(this.refs.newCounterName).value = '';
    React.findDOMNode(this.refs.newCounterAmount).value = '';
    this._handleRequestClose();
  }

  checkBoxCheck(event, checked) {
    this.setState({showStoreOptions: checked});
  };

  render() {
    const {categories, locations} = this.props;
    return (<Dialog
            title="Add Counter"
            ref="addDialog"
            actions={[
              { text: 'Cancel' },
              { text: 'Add', onTouchTap: ::this.addCounter, ref: 'submit' }
            ]}
            actionFocus="submit"
            open={this.props.show}
            onRequestClose={::this._handleRequestClose}>
            <TextField ref="newCounterName" hintText="Name"/><br/>
            <TextField ref="newCounterPrice" hintText="Price"/><br/>
            <span style={{display: this.state.showStoreOptions ? 'none' : 'block'}}><TextField ref="newCounterAmount" hintText="Total"/><br/></span>
            <span style={{display: this.state.showStoreOptions ? 'block' : 'none'}}>
              { Object.keys(locations).map(function(key, index) {
                return <div key={index}><TextField ref={'location_' + key} hintText={'Total ' + locations[key]}/></div>;
              })}
            </span>
            Category: <DropDownMenu onChange={::this.newCounterDropdownChange} ref="newCounterCategory" menuItems={categories}/><br/><br/>
            <Checkbox
              name="checkboxStorage1"
              value="hasStorage"
              label="has storage"
              ref="hasStorage"
              onCheck={::this.checkBoxCheck}/>
          </Dialog>);
  }
}
