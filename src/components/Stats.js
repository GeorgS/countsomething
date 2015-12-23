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
          count += counters[index].counts[_index][1] || counters[index].counts[_index].noStore;
        });
        if (count) {
          if (!table[count]) {
            table[count] = [];
          }
          table[count].push(index);
        }
      });
      var result = [];
      for (var i = 1; i <= amount; i++) {
        result[i] = {counter: table[Object.keys(table)[Object.keys(table).length - i]],
                     count: Object.keys(table)[Object.keys(table).length - i]};
      }
      return result;
    }
    return [];
  }

  render() {
    let _this = this;
    return (<div>
      <h1>Stats</h1>
      <h2>Top Sold Products</h2>
      <ul>{::this.getTopSold(3).map(function(item) {
          {return item.counter.map(function(counter) {
            return <li>{_this.props.counters[counter].name} <small>{item.count}</small></li>
          })
          };
      })}</ul>
    </div>);
  }
}
