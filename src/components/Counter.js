import React, { Component, PropTypes} from 'react';
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const RaisedButton = require('material-ui/lib/raised-button');
const FontIcon = require('material-ui/lib/font-icon');
const Avatar = require('material-ui/lib/avatar');
const TextField = require('material-ui/lib/text-field');

export default class Counter extends Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    removeCounter: PropTypes.func.isRequired,
    overwriteTotal: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    hasStore: PropTypes.bool.isRequired
  }

  increment(event) {
    event.stopPropagation();
    this.props.increment(this.props.index, 1, this.props.hasStore ? this.props.location : 'noStore');
  }

  decrement(event) {
    event.stopPropagation();
    this.props.decrement(this.props.index, 1, this.props.hasStore ? this.props.location : 'noStore');
  }

  remove(event) {
    event.stopPropagation();
    this.props.removeCounter(this.props.index);
  }

  overwriteTotal() {
    this.props.overwriteTotal(this.props.index, parseFloat(this.refs.totalOverwrite.getValue()), this.props.hasStore ? this.props.location : 'noStore');
  }

  render() {
    const { price, count, total, name} = this.props;
    const itemcolor = (count > 0) ? '#00bcd4' : '#ccc';
    return (
  <Card initiallyExpanded={false}>
  <CardHeader
    showExpandableButton={true}
    avatar={<Avatar className="avatar-count" ref="countNumber" style={{background: 'transparent', border: '2px solid ' + itemcolor, color: itemcolor, padding: '.5em'}} onClick={::this.decrement}>{count}</Avatar>}
    title={name}
    subtitle={<span>Price: {price} €<br/>{ this.props.hasStore ? ('Total: ' + total) : ''}</span>}/>
  <CardActions expandable={true} style={{marginTop: '20px'}}>
    <RaisedButton label={ '-' } onTouchTap={::this.increment}/>
    <RaisedButton label={ '+' } onTouchTap={::this.decrement}/><br />
    <TextField ref="totalOverwrite" hintText="Value to overwrite with"/><RaisedButton label={ 'overwrite total' } onTouchTap={::this.overwriteTotal}/>
    <RaisedButton label="delete" onTouchTap={::this.remove}><FontIcon className="material-icons">clear</FontIcon></RaisedButton>
  </CardActions>
  <CardText/>
</Card>
    );
  }
}
