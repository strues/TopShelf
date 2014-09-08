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
  app.use('/api/recruits', require('./api/recruit'));
  
  app.use('/auth', require('./authorization'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {   root: path.normalize(__dirname + '/../client') });
});

  // Error 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


};