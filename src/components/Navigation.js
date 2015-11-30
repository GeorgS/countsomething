import React, { Component, PropTypes } from 'react';
const LeftNav = require('material-ui/lib/left-nav');
const AppBar = require('material-ui/lib/app-bar');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');

export default class Navigation extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    onChangeCat: PropTypes.func.isRequired,
    onChangeLoc: PropTypes.func.isRequired,
    export: PropTypes.func.isRequired
  }

  state = {
    selectedIndexCat: 0,
    selectedIndexLoc: 0,
    locNavOpen: false,
    catNavOpen: false
  }

  onChangeCat(event, selectedIndexCat) {
    this.toggleNavCat();
    this.setState({
      selectedIndexCat
    });
    this.props.onChangeCat(event, selectedIndexCat);
  }

  onChangeLoc(event, selectedIndexLoc) {
    this.toggleNavLoc();
    this.setState({
      selectedIndexLoc
    });

    this.props.onChangeLoc(event, selectedIndexLoc);
  }

  toggleNavCat(event) {
    if (event) { event.preventDefault(); }
    this.refs.leftNavCat.toggle();
  }

  toggleNavLoc(event) {
    if (event) { event.preventDefault(); }
    this.refs.leftNavLoc.toggle();
  }
  _getSelectedIndexCat() {
    return this.state.selectedIndexCat;
  }

  _getSelectedIndexLoc() {
    return this.state.selectedIndexLoc;
  }

  render() {
    const { categories, locations } = this.props;
    return (<div>
<LeftNav docked={false} header={<div style={{background: '#00bcd4', color: '#fff', cursor: 'pointer', fontSize: '1.5em', fontWeight: 300, lineHeight: '2.65em', marginBottom: '8px', paddingLeft: '24px', paddingTop: '0px'}}>Kategorie</div>} selectedIndex={this._getSelectedIndexCat()} onChange={::this.onChangeCat} ref="leftNavCat" menuItems={categories} />
<LeftNav docked={false} header={<div style={{background: '#00bcd4', color: '#fff', cursor: 'pointer', fontSize: '1.5em', fontWeight: 300, lineHeight: '2.65em', marginBottom: '8px', paddingLeft: '24px', paddingTop: '0px'}}>Location</div>} selectedIndex={this._getSelectedIndexLoc()} onChange={::this.onChangeLoc} ref="leftNavLoc" menuItems={locations} />
      <AppBar
    title="CountSomething"
    iconElementRight={
    <IconMenu iconButtonElement={
      <IconButton><i className="material-icons">more_vert</i></IconButton>
    }>
      <MenuItem onTouchTap={::this.toggleNavLoc} primaryText="Location" />
      <MenuItem onTouchTap={this.props.export} primaryText="Export" />
      <MenuItem primaryText="Date" />
    </IconMenu>
  }
    onLeftIconButtonTouchTap={::this.toggleNavCat}/></div>);
  }
}
