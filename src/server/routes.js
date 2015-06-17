/**
 * Main application routes
 */

let errors = require('./lib/errors');

export default (app) => {
  app.use('/api/recruitment-threads', require('./api/recruitmentThread'));
  app.use('/api/recruiting', require('./api/recruitment'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/battlenet', require('./api/battlenet'));
  //app.use('/api/guild', require('./api/guild'));
  app.use('/auth', require('./auth'));

  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
      .get(errors[404]);

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
