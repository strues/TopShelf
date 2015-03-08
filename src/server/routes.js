'use strict';

var errors = require('./components/errors');
var path = require('path');
var config = require('./config/environment');

module.exports = function(app) {

    // Routes

    app.use('/api/users', require('./api/user'));
    app.use('/api/roster', require('./api/roster'));
    app.use('/api/resources', require('./api/resource'));
    app.use('/api/characters', require('./api/character'));
    app.use('/api/posts', require('./api/post'));
    app.use('/api/files', require('./api/file'));
    app.use('/api/applications', require('./api/application'));
    app.use('/api/slides', require('./api/slide'));
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
        res.status(500).body({
            message: err.message
        });
    });
};