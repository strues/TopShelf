var cfg = require('./environment');

// Initialize thinky
 var thinky = require('thinky')({
  host: cfg.rethink.host,
  port: cfg.rethink.port,
  db: cfg.rethink.db
});

exports.thinky = thinky;
