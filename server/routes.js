/**
 * Main Routes file
 * Includes our routes from api/FOLDER/index.js
 * Defines our default api
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
module.exports = function(app) {

  /*
   * Routes
   * All undefined assets or api routes should return a 404
   * All other routes should redirect to the index.html
   */
  //app.use('/api/users', require('./api/users'));
  app.use('/api/applications', require('./api/applications'));
  app.use('/api/users', require('./api/users'));
  app.use('/api/raids', require('./api/raids'));
  app.use('/api/rosters', require('./api/roster'));
  app.use('/api/recruits', require('./api/recruit'));
  
  app.use('/auth', require('./authorization'));
  
  // Error 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
  
};