import React, { Component, PropTypes } from 'react';

export default class Stats extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
  }

  getTopSold(amount) {
    const counters = this.props.counters;
    const table = {};
    if (Object.keys(counters).length > 0) {
      Object.keys(counters).forEach(function(index) {
        var count = 0;
        Object.keys(counters[index].counts).forEach(function(_index) {
          count += counters[index].counts[_index][1];
        });
        if (count) {
          table[count] = counters[index];
          table[count].count = count;
        }
      });
      var result = [];
      for (var i = 1; i <= amount; i++) {
        result[i] = {name: table[Object.keys(table)[Object.keys(table).length - i]].name,
                     count: table[Object.keys(table)[Object.keys(table).length - i]].count};
      }
      return result;
    }
    return [];
  }

  render() {
    return (<div>
      <h1>Stats</h1>
      <h2>Top Sold Products</h2>
      <ul>{::this.getTopSold(3).map(function(item) {
        return <li>{item.name} <small>{item.count}</small></li>;
      })}</ul>
    </div>);
  }
}
