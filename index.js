var wrap = require('co-level');

function LevelStore(options) {
  options = options || {};
  if(!options.db) {
    throw new Error('Please provide a `db`!');
  }
  this.db = options.db;
}

LevelStore.prototype.get = function* get(sid) {
  return yield* this.db.get(sid, {
    valueEncoding: 'json'
  });
};

LevelStore.prototype.set = function* set(sid, sess, ttl) {
  yield* this.db.set(sid, sess, {
    valueEncoding: 'json',
    ttl: ttl
  });
};

LevelStore.prototype.destroy = function* destroy(sid) {
  yield* this.db.del(sid);
};

module.exports = LevelStore;
