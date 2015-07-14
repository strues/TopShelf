module.exports = function() {
  let User = require('../api/user/user.model');

  let userSeed = [];
  let basic = {
    provider: 'local',
    role: 'basic',
    username: 'Test',
    email: 'test@test.com',
    password: 'test'
  };

  let admin = {
    provider: 'local',
    role: 'admin',
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  };

  userSeed.push(admin);
  userSeed.push(basic);

  // In case we need to delete any users
  // User.remove({}, function (err, users) {
  //   if(err) { return handleError(err); }
  //   if(!users) { return false; }
  // });

  User.find(function(err, users) {
    if (err) {
      return handleError(err);
    }
    if (users.length === 0) {
      User.create(userSeed, function() {
        if (err) {
          return handleError(err);
        }
        console.log('users initialized');
      });
    }
  });

  function handleError(err) {
    return console.log('Initializing data error: ', err);
  }
};
