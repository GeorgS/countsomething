var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var redux = require('redux');

app.use(require('morgan')('short'));

(function initWebpack() {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.get('/', function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

if (require.main === module) {
  server.listen(process.env.PORT || 3333, function onListen() {
    var address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
  });
}

var counter = function (state, action) {
  state = state || {};
  switch (action.type) {
  case 'SET_STATE':
    return action.payload;
  default:
    return state;
  }
};

var stateJson = JSON.parse(fs.readFileSync('./store/state.json'));
const store = redux.createStore(counter, stateJson);

io.on('connection', function(socket) {

  console.log('client', socket.id ,'connected');
  socket.emit('state', JSON.stringify(store.getState()));

  socket.on('state', function(data) {
    const _data = JSON.parse(data);
    console.log("-> receving directives to update remote state from", socket.id);
    store.dispatch({type: 'SET_STATE', payload: _data.counter});
  });

  socket.on('disconnect', function() {
    console.log('client', socket.id ,'disconnected');
  });
})

store.subscribe(function() {
  const stateUpdated = JSON.stringify(store.getState())
  io.emit('state', stateUpdated);
  fs.writeFile('store/state.json', stateUpdated, function (err) {
    if (err) return console.log(err);
  });
});
