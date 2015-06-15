'use strict';
/**
 * Main application routes
 */

var debug = require('debug'),
    errors = require('./lib/errors');

module.exports = function(app) {
  app.use('/api/recruitment-threads', require('./api/recruitmentThread'));
  app.use('/api/recruiting', require('./api/recruitment'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/users', require('./api/user'));
  //app.use('/api/guild', require('./api/guild'));
  app.use('/auth', require('./auth'));
  // All other routes should redirect to the index.html
    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
      .get(errors[404]);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
  // Handle 404 Errors
  app.use(function(req, res, next) {
    res.sendStatus(404);
    debug('404 Warning. URL: ' + req.url);
  });

};
