/**
 * Main application routes
 * All responses are routed through the middleware.extendResponse middleware.
 * POST, PUT, PATCH and DELETE requests are
 * routed through the middleware.removeReservedSchemaKeywords middleware.
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var middleware = require('./components/middleware');

module.exports = function(app) {

  // Routes
  app.use('/api/v1/articles', require('./api/article'));
  app.use('/auth', require('./auth'));
  app.use('/api/v1/files', require('./api/file'));
  //app.use('/api/progression', require('./api/progression'));
  app.use('/api/v1/resources', require('./api/resource'));
  app.use('/api/v1/recruitment', require('./api/recruitment'));
  app.use('/api/v1/roster', require('./api/roster'));
  app.use('/api/v1/slides', require('./api/slide'));
  app.use('/api/v1/users', require('./api/user'));
  app.use('/api/v1/tags', require('./api/tag'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
      .get(function invalidRoute(req, res) { return res.notFound(); });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function getIndexFile(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  // register the default error handler
  app.use(middleware.defaultErrorHandler);
};
