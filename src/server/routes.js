/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {
  app.use('/api/recruiting', require('./api/recruitment'));
  app.use('/api/files', require('./api/file'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/roster', require('./api/roster'));
  app.use('/auth', require('./auth'));

  // All other routes should redirect to the index.html
  app.route('/*')
  .get(function(req, res) {
    res.sendFile(app.get('appPath') + '/index.html');
  });
};
