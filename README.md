# koa-level

Session storage for [koa-sess](https://github.com/koajs/koa-session).

## Install

```
$ npm install koa-level
```

## Usage

```js
var koa = require('koa');
var level = require('levelup');
var session = require('koa-sess');
var levelSess = require('koa-level');

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
```

## API

### level(opts)

Create [koa-sess](https://github.com/koajs/koa-session) compatilbe storage from
`opts.db`.

## Complex stuff

If you don't want to pollute the db, use [level-sublevel](https://github.com/dominictarr/level-sublevel) to prefix session ids (you can put data in different "*tables*").

TTL is only supported, when the underlying db supports it, via [level-tt](https://github.com/rvagg/node-level-ttl) or similar.

You can use leveldb over the network with [multilevel](https://github.com/juliangruber/multilevel).

## License

MIT
