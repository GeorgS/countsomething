import {today} from './general';
// TODO: rewrite!

export const exportCSV = function exportCSV(props) {
  var array = props.counters;
  var locations = props.locations;
  var str = '"Angebot";"Bestand Frueh"; ; ;"Verkauft";"Preis";"Summe";"Bestand Abend"; ; ;\r\n"";';
  var locationsStr = '';
  Object.keys(locations).forEach(function loopLocations(key) {
    locationsStr += '"' + locations[key] + '";';
  });
  locationsStr += '"Gesamt";';
  var totalSum = 0;
  str += locationsStr;
  str += '; ; ;' + locationsStr + '\r\n';
  for (var i = 1; i <= Object.keys(array).length+1; i++) {
    if (array.hasOwnProperty(i)) {
      var line = new Array();
      line.push('"' + array[i].name + '"');
      var total = 0;
      if (array[i].hasStore) {
      Object.keys(locations).forEach(function(key, index) {
        var status = ((array[i].total[key] || 0) + (array[i].hasStore ? ((array[i].counts[today()] || 0)[key] || 0) : ((array[i].counts[today()] || 0).noStore || 0)));
        line.push('"' + status + '"');
        total += status;
      });
     } else {
        line.push('"0"');
        line.push('"0"');
      }
      line.push('"' + (total || 0) + '"');
      line.push('"' + (array[i].hasStore ? ((array[i].counts[today()] || 0)[1] || 0) : ((array[i].counts[today()] || 0).noStore || 0)) + '"');
      line.push(array[i].price.toString().replace('.', ',') + ' €');
      var sumEl = (parseFloat(array[i].price) * (array[i].hasStore ? ((array[i].counts[today()] || 0)[1] || 0) : ((array[i].counts[today()] || 0).noStore || 0))).toFixed(2);
      line.push('"' + sumEl.replace('.', ',') + ' €"');
      totalSum += parseFloat(sumEl);
      var total2 = 0;
      Object.keys(locations).forEach(function(key, index) {
        line.push('"' + (array[i].total[key] || 0) + '"');
        total2 += (array[i].total[key] || 0);
      });
      line.push('"' + (total2 || 0) + '"');
      str += line.join(';');
      str += '\r\n';
    }
  }
  str += '"Gesamt";;;;;;' + totalSum.toFixed(2).replace('.', ',') + ' €;;;;\r\n';
  var link = document.createElement('a');
  link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(str);
  link.download = 'countsomething_export.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
