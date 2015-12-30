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

  generateCounter(edit) {
    const _this = this;
    const hasStorage = this.refs.hasStorage.isChecked();
    const locations = this.props.locations;
    const stores = {};

    Object.keys(locations).forEach(function(key) {
      stores[key] = parseFloat(_this.refs['location_' + key].getValue());
    });

    return {
      name: _this.refs.newCounterName.getValue(),
      total: hasStorage ? stores : parseFloat(_this.refs.newCounterAmount.getValue()),
      category: (this.state.newCounterCategory + 1) || this.props.counter.category || 0,
      hasStore: hasStorage,
      price: parseFloat(_this.refs.newCounterPrice.getValue().replace(',', '.'))
    }
  }

  addCounter() {
    this.props.addCounter(this.generateCounter());

    React.findDOMNode(this.refs.newCounterName).value = '';
    this._handleRequestClose();
  }

  checkBoxCheck(event, checked) {
    this.setState({showStoreOptions: checked});
  };

  editCounter() {
    const edited = this.generateCounter();
    edited.id = this.props.index;
    this.props.editCounter(edited);

    React.findDOMNode(this.refs.newCounterName).value = '';
    this._handleRequestClose();
  }

  render() {
    const {categories, locations, edit, counter} = this.props;
    console.log(counter, this.props.index, categories);
    return (<Dialog
            title={edit ? 'Edit Counter' : 'Add Counter'}
            ref="addDialog"
            actions={[
              { text: 'Cancel' },
              { text: edit ? 'Save' : 'Add', onTouchTap: edit ? ::this.editCounter : ::this.addCounter, ref: 'submit' }
            ]}
            actionFocus="submit"
            open={this.props.show}
            onRequestClose={::this._handleRequestClose}>
            <TextField ref="newCounterName" hintText="Name" defaultValue={edit ? counter.name : ''}/><br/>
            <TextField ref="newCounterPrice" hintText="Price" defaultValue={edit ? counter.price : ''}/><br/>
            {/*<span style={{display: this.state.showStoreOptions ? 'none' : 'block'}}><TextField ref="newCounterAmount" hintText="Total"/><br/></span>*/}
            <span style={{display: (this.state.showStoreOptions || (edit && counter.hasStore)) ? 'block' : 'none'}}>
              { Object.keys(locations).map(function(key, index) {
                return <div key={index}><TextField ref={'location_' + key} hintText={'Total ' + locations[key]} defaultValue={edit ? counter.total[key] : ''}/></div>;
              })}
            </span>
            Category: <DropDownMenu selectedIndex={this.state.newCounterCategory || (edit ? (counter.category-1) : 0)} onChange={::this.newCounterDropdownChange} ref="newCounterCategory" menuItems={categories}/><br/><br/>
            <Checkbox
              name="checkboxStorage1"
              value="hasStorage"
              label="has storage"
              ref="hasStorage"
              defaultChecked={edit ? counter.hasStore : false}
              onCheck={::this.checkBoxCheck}/>
          </Dialog>);
  }
}
