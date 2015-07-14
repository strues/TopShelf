/*
 * RequestLogger.js
 *
 * The request logger is a middleware responsible
 * for logging each received request
 */

const logger = require('./index');

module.exports = function(req, res, next) {
  logger.info('received request: \'' + req.method + ' ' + req.url + '\' from IP: ' + req.ip);
  next();
};
