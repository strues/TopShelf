/**
 * Route includes for API calls
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

// Routes
  app.use('/api/users', require('./api/user'));
  app.use('/api/posts', require('./api/post'));
  app.use('/api/applications', require('./api/application'));
  app.use('/api/recruitment', require('./api/recruitment'));
  app.use('/api/roster', require('./api/roster'));
  app.use('/api/characters', require('./api/character'));
  app.use('/api/raids', require('./api/raid'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
