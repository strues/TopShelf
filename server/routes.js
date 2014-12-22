/**
 * Route includes for API calls
 * http://192.168.33.10/xf/api/index.php?oauth/authorize&?scope=read+post&client_id=dev123&response_type=code&redirect_uri=http://192.168.33.10/xf/
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var commentController = require('./api/comment/comment.controller');

module.exports = function(app) {

// Routes
  app.use('/api/users', require('./api/user'));
  app.use('/api/posts', require('./api/post'));
  app.use('/api/applications', require('./api/application'));
  app.use('/api/recruitment', require('./api/recruitment'));
  app.use('/api/roster', require('./api/roster'));
  app.use('/api/characters', require('./api/character'));
  app.use('/api/raids', require('./api/raid'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/categories', require('./api/category'));

  app.use('/auth', require('./auth'));
  app.get('/api/posts/:postId/comments', commentController.getList);
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // handle pretty urls
  app.get('*', function(req, res) {
      'use strict';
      res.redirect('/#' + req.originalUrl);
  });

  // error handling
  app.use(function(err, req, res) {
      'use strict';
      res.status(500).body({ message: err.message });
  });

  app.get('/session/set/:value', function(req, res) {
    req.session.redSession = req.params.value;
    res.send('session written in Redis successfully');
  });

  app.get('/session/get/', function(req, res) {
    if(req.session.redSession)
      res.send('the session value stored in Redis is: ' + req.session.redSess);
    else
      res.send('no session value stored in Redis ');
  });
};
