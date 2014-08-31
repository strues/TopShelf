/**
 * Main Routes file
 * Includes our routes from api/FOLDER/index.js
 * Defines our default api
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  /*
   * Routes
   * All undefined assets or api routes should return a 404
   * All other routes should redirect to the index.html
   */
  //app.use('/api/users', require('./api/users'));
  app.use('/api/applications', require('./api/applications'));

  
  // Error 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  
};