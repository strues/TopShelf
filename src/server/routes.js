'use strict';
/**
 * Main application routes
 */


var debug = require('debug');

module.exports = function(app) {
  app.use('/api/recruitment-threads', require('./api/recruitmentThread'));
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

  // Handle 404 Errors
  app.use(function (req, res, next) {
    res.sendStatus(404);
    debug('404 Warning. URL: ' + req.url);

    // Respond with html page
    if (req.accepts('html')) {
      res.render('error/404', {url: req.url});
      return;
    }

    // Respond with json
    if (req.accepts('json')) {
      res.send({error: 'Not found!'});
      return;
    }

    // Default to plain-text. send()
    res.type('txt').send('Error: Not found!');

  });

};
