(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('OAUTH', {
      LOGINS: [
        {
          account: 'google',
          name: 'Google',
          url: 'http://accounts.google.com'
        }, {
          account: 'twitter',
          name: 'Twitter',
          url: 'http://twitter.com'
        }, {
          account: 'facebook',
          name: 'Facebook',
          url: 'http://facebook.com'
        }, {
          account: 'github',
          name: 'GitHub',
          url: 'http://github.com'
        },
        {
          account: 'battlenet',
          name: 'Battlenet',
          url: 'https://us.battle.net'
        }
      ]
    });
})();
