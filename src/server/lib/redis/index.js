'use strict';
var curl = require('request'),
    crypto = require('crypto'),
    cacheKey = crypto.createHash('md5').update('' +
      (Math.random() * Date.now())).digest('hex').toString();

/**
 * @method TopShelf#cachingMiddleware
 * @param {(number|null)} [ttl=60] cache invalidation time, default is 60 seconds
 * @description
 * Generate caching middleware for this route
 * @example
 * TopShelf.extendRoutes(app){
 *  app.use('/cacheForTenSeconds', App.cachingMiddleware(10000));
 *  app.use('/cacheForSixtySeconds', App.cachingMiddleware(60000));
 *  app.get('*', function(request, response){
 *    response.send('Current time is '+new Date());
 *  });
 * }
 *
 */
module.exports = exports = function (app) {
  return function (ttlInMilliSeconds) {
    ttlInMilliSeconds = ttlInMilliSeconds || 60 * 1000;
    var redisClient = app.redisClient;

    return function (req, res, next) {
      if (req.method === 'GET' && req.headers.shelf_cache !== cacheKey) {
        var key = req.originalUrl,
          data = {};
        app.async.waterfall([
          function (cb) {
            app.async.parallel({
              'dataFound': function (clb) {
                redisClient.hgetall(key, clb);
              },
              'age': function (clb) {
                redisClient.ttl(key, clb);
              }
            }, function (error, obj) {
              if (error) {
                cb(error);
              } else {
                cb(null, obj.dataFound, obj.age);
              }
            });
          },
          function (dataFound, age, cb) {
            if (dataFound) {
              data.Expires = new Date(Date.now() + age).toUTCString();
              data['Last-Modified'] = new Date(dataFound.savedAt).toUTCString();
              data['Content-Type'] = dataFound.contentType;
              data.statusCode = dataFound.statusCode;
              data.content = dataFound.content;
              cb(null, true);
            } else {
              var headers = req.headers;
              headers.shelf_cache = cacheKey;
              curl({
                'method': 'GET',
                'headers': headers,
                'url': 'http://localhost:' + core.config.port + key
              }, function (error, response, body) {
                if (error) {
                  cb(error);
                } else {
                  data.Expires = new Date(Date.now() + ttlInMilliSeconds).toUTCString();
                  data['Last-Modified'] = new Date().toUTCString();
                  data['Content-Type'] = response.headers['content-type'];
                  data.statusCode = response.statusCode;
                  data.content = body;
                  cb(error, false);
                }
              });
            }
          },
          function (hit, cb) {
            if (hit) {
              cb(null);
            } else {
              app.async.series([
                function (clb) {
                  redisClient.hmset(key, {
                    'savedAt': new Date(),
                    'contentType': data['Content-Type'],
                    'statusCode': data.statusCode,
                    'content': data.content
                  }, clb);
                },
                function (clb) {
                  redisClient.expire(key, Math.floor(ttlInMilliSeconds / 1000), clb);
                }
              ], cb);
            }
          }
        ], function (error) {
          if (error) {
            next(error);
          } else {
            res.set('Expires', data.Expires);
            res.set('Last-Modified', data['Last-Modified']);
            res.set('Content-Type', data['Content-Type']);
            res.status(data.statusCode);
            res.send(data.content);
          }
        });
      } else {
        next();
      }
    };
  };
};
