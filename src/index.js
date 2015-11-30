import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createBrowserHistory from 'history/lib/createBrowserHistory';
const injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const history = createBrowserHistory();

ReactDOM.render(
  <Root style={{fontFamily: 'Roboto, System, sans-serif'}} history={history} />,
  document.getElementById('root')
);
