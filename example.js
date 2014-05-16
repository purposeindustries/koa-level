var koa = require('koa');
var level = require('levelup');
var session = require('koa-sess');
var levelSess = require('./');

var db = level('./db');

var app = koa();
app.use(session({
  store: levelSess({ db: db })
}));

app.use(function*() {
  if(this.url.match(/hello\/\w+/)) {
    this.session.name = this.url.match(/hello\/(\w+)/)[1];
  }
  this.body = 'Hello ' + this.session.name
});

app.listen(3000);
