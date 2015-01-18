'use strict';

var errors = require('./components/errors');
var path = require('path');
var config = require('./config/environment');

module.exports = function(app) {

// Routes

    app.use('/api/users', require('./api/user'));
    app.use('/api/posts', require('./api/post'));
    app.use('/api/applications', require('./api/application'));
    app.use('/api/recruitment', require('./api/recruitment'));
    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

    // handle pretty urls
    app.get('*', function(req, res) {
        res.redirect('/#' + req.originalUrl);
    });

    app.all('*', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers',
      'X-Requested-With, Content-Type, Authorization');
        if ('OPTIONS' === req.method) {
            return res.sendStatus(200);
        }
        next();
    });

  // error handling
    app.use(function(err, req, res) {
      res.status(500).body({message: err.message});
  });

    app.get('/session/set/:value', function(req, res) {
        req.session.redSession = req.params.value;
        res.send('session written in Redis successfully');
    });

    app.get('/session/get/', function(req, res) {
        if (req.session.redSession) {
            res.send('the session value stored in Redis is: ' + req.session.redSess);
        }
        else {
            res.send('no session value stored in Redis ');
        }
    });
};
