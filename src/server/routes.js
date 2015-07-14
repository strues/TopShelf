/**
 * Main application routes
 */

export default (app) => {
  app.use('/api/recruiting/threads', require('./api/recruitmentThread'));
  app.use('/api/recruiting', require('./api/recruitment'));
  app.use('/api/raids', require('./api/raid'));
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/roles', require('./api/roles'));
  app.use('/api/battlenet', require('./api/battlenet'));
  app.use('/auth', require('./auth'));

  app.route('/*')
    .get(function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
};
